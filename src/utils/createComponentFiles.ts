import { Attrs , ClassNameRecord , StyleRecord , tagsWithNoChildren } from '../../src/core/TagNode';
import { capitalize, flatten } from 'lodash';
import { GlobalState } from 'src/core/store/modules/template/reducer';
import { attrsExisting, stylesExisting } from '../core/TagManager/config';
import styles from '../stylotron/src/styles.json';
import { ExtendedNode } from '../../src/core/ExtendedNode';

const hyperscript = require('hyperscript');

interface ClassNameForCompile {
  name: string;
  classNamesExisting: ClassNameRecord;
  classNamesVariabled: StyleRecord;
}

const importScssFileAs = 'classes';
export const getComponentName = (name: string): string => name.split(' ').map(capitalize).join('');
export const componentNameToJSXPrependingPart = '$%^*';
export const componentNameToJSXAppendingPart = `*^%$`;
export const componentNameToJSX = (value: string) =>
  componentNameToJSXPrependingPart + value + componentNameToJSXAppendingPart;

export const alignStyles = (styleRecord: StyleRecord, env: 'dev' | 'prod') =>
  Object.entries(styleRecord).reduce((acc, [key, value]) => {
    const foundStyleConfig = stylesExisting.find((config) => config.name === key);
    const fileValueCreator =
      foundStyleConfig &&
      (env === 'dev' ? foundStyleConfig.fileValueCreatorDev : foundStyleConfig.fileValueCreatorProd);

    return { ...acc, [key]: fileValueCreator ? fileValueCreator(value) : value };
  }, {} as StyleRecord);

export const alignAttrs = (attrs: Attrs, env: 'dev' | 'prod') =>
  Object.entries(attrs).reduce((acc, [key, value]) => {
    const foundAttrsConfig = attrsExisting.find((config) => config.name === key);
    const fileValueCreator =
      foundAttrsConfig &&
      (env === 'dev' ? foundAttrsConfig.fileValueCreatorDev : foundAttrsConfig.fileValueCreatorProd);

    return { ...acc, [key]: fileValueCreator ? fileValueCreator(value as string) : value };
  }, {} as Attrs);

const replaceClassField = (html: string) =>
  html
    .replaceAll('class="', 'className="')
    .split('className="')
    .map((piece, index) =>
      index === 0
        ? piece
        : piece
            .split('"')
            .map((piece2, index2) => (index2 !== 0 ? piece2 : `${importScssFileAs}.${piece2}`))
            .join('"')
            .replace('"', '}')
    )
    .join('className={');

const replaceInlineTagClosing = (html: string) =>
  tagsWithNoChildren.reduce(
    (acc, cur) =>
      acc
        .split(`<${cur}`)
        .map((str, index, arr) => (index > 0 ? str.replace('>', '/>') : str))
        .join(`<${cur}`),
    html
  );

const replaceComponentJSXName = (html: string) =>
  html.replaceAll(componentNameToJSXPrependingPart, '<').replaceAll(componentNameToJSXAppendingPart, '/>');

export const variablesFileName = '_variables.scss';

export const createScssComponent = (
  globalState: GlobalState,
  node: ExtendedNode,
  cssClassesList: ClassNameForCompile[]
): string =>
  `// @import "styles/index";

          ${cssClassesList
            .map(
              (config) => `
.${config.name} {
  ${[
    ...Object.values(config.classNamesExisting).reduce((acc, className) => {
      if (className) {
        let classNameValue;

        styles.classBranches.forEach((branch) =>
          (branch.units ? flatten(Object.values(branch.units)) : branch.classes)?.forEach((classNameConfig) => {
            if (classNameConfig.name === className) {
              classNameValue = classNameConfig.value; // set found className
            }
          })
        );

        return !classNameValue ? acc : [...acc, classNameValue];
      } else {
        return acc;
      }
    }, []),
    ...Object.entries(config.classNamesVariabled)
      .filter(([, value]) => !!value)
      .map(
        ([key, value]) =>
          `${key
            .split('')
            .map((letter) => (letter.toLowerCase() === letter ? letter : `-${letter.toLowerCase()}`))
            .join('')}: ${(() => {
            const foundVariable = Object.entries(globalState.variables).find(([, value2]) => value === value2);
            return foundVariable ? `$${foundVariable[0]}` : value;
          })()}`
      ),
  ].join(`;
`)}
}
`
            )
            .join('')}`;

export function createReactComponent(node: ExtendedNode): { file: string; cssClassesList: ClassNameForCompile[] } {
  const componentName = getComponentName(node.name);
  const importedComponents: string[] = [];
  const addImportedComponent = (name: string) => importedComponents.push(name);
  const cssClassesList: ClassNameForCompile[] = [];
  const addClass = (cssClass: ClassNameForCompile) => cssClassesList.push(cssClass);

  const tagProcessor = (node: ExtendedNode, initialNode: boolean): ReturnType<typeof hyperscript> => {
    const classNameConfig = ((): undefined | ClassNameForCompile => {
      if(node.reactComponent && !initialNode) {
        return undefined;
      }

      const classNamesExisting = node.className;
      const classNamesVariabled = alignStyles(node.style, 'prod');
      const name = initialNode
        ? 'container'
        : !node.name
        ? ''
        : node.name
            .trim()
            .split(' ')
            .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
            .join('') || 'id-' + node.id;

      return { name, classNamesExisting, classNamesVariabled };
    })();

    const attrs = alignAttrs(node.attrs, 'prod');

    if (classNameConfig?.name) {
      addClass(classNameConfig);
      attrs.className = classNameConfig.name;
    }

    return !node.reactComponent || initialNode
      ? hyperscript(node.tag, attrs, node.isText ? node.text : node.children.map((ch) => tagProcessor(ch, false)))
      : (() => {
          const name = getComponentName(node.name);

          if (!name) {
            throw Error(`There is component without name, ${node.xPath}`);
          }

          if (!importedComponents.includes(name)) {
            addImportedComponent(name);
          }

          return componentNameToJSX(name);
        })();
  };

  const adaptTemplateToJSX = (html: string) =>
    replaceClassField(replaceInlineTagClosing(replaceComponentJSXName(html)));

  const jsxContent = adaptTemplateToJSX(tagProcessor(node, true).outerHTML);

  const file = `import React from 'react'
import ${importScssFileAs} from './styles.module.scss'
${importedComponents.map((name) => `import ${name} from '${node.deepIndex === 0 ? '.' : '..'}/${name}'`).join(`
`)}

export const View = () => {
  return (
    ${jsxContent}
  )
}
`;

  return { file, cssClassesList };
}

export function createComponentFiles(globalState: GlobalState, node: ExtendedNode): Record<string, string> {
  const filesMap: Record<string, string> = {};
  const name = getComponentName(node.name);
  const folderName = node.deepIndex === 0 ? '' : name + '/'

  const { file: reactFile, cssClassesList } = createReactComponent(node);

  filesMap[folderName + 'view.tsx'] = reactFile;
  filesMap[folderName + 'index.ts'] = `
import { View } from "./view"

export default View
`;
  filesMap[folderName + 'styles.module.scss'] = createScssComponent(globalState, node, cssClassesList);

  return filesMap;
}
