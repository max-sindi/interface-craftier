import { ClassNameRecord, StyleRecord } from 'src/core/TagNode';
import { capitalize, flatten } from 'lodash';
import { GlobalState } from 'src/core/store/modules/template/reducer';
import { tagsWithNoChildren } from '../core/TagManager/config';
import styles from '../stylotron/src/styles.json';
import { ExtendedNode } from 'src/core/ExtendedNode';

const hyperscript = require('hyperscript');

interface ClassNameForCompile {
  name: string;
  classNamesExisting: ClassNameRecord;
  classNamesVariabled: StyleRecord;
}

export const getComponentName = (name: string): string => name.split(' ').map(capitalize).join('');
export const componentNameToJSXPrependingPart = '$%^*';
export const componentNameToJSXAppendingPart = `*^%$`;
export const componentNameToJSX = (value: string) =>
  componentNameToJSXPrependingPart + value + componentNameToJSXAppendingPart;
const importScssFileAs = 'classes';

const replaceClassField = (html: string) =>
  html
    .replaceAll('class="', 'className="')
    .split('className="')
    .map((piece, index, arr) =>
      index === 0
        ? piece
        : piece
            .split('"')
            .map((piece2, index2, arr2) => (index2 !== 0 ? piece2 : `${importScssFileAs}.${piece2}`))
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
  `@import '${variablesFileName}';
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
  const cssClassesList: ClassNameForCompile[] = [];
  const addImportedComponent = (name: string) => importedComponents.push(name);

  const tagProcessor = (node: ExtendedNode, initialNode: boolean): ReturnType<typeof hyperscript> => {
    const classNameConfig = ((): ClassNameForCompile => {
      const classNamesExisting = node.className;
      const classNamesVariabled = node.style;
      const name = !node.name
        ? ''
        : node.name
            .trim()
            .split(' ')
            .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
            .join('') || 'id-' + node.id;

      return { name, classNamesExisting, classNamesVariabled };
    })();

    const attrs = { ...node.attrs };

    if (classNameConfig.name) {
      cssClassesList.push(classNameConfig);
      attrs.className = classNameConfig.name;
    }

    return !node.reactComponent || initialNode
      ? hyperscript(node.tag, attrs, node.isText ? node.text : node.children.map((ch) => tagProcessor(ch, false)))
      : (() => {
          const name = getComponentName(node.name);
          if (!name) {
            throw Error(`There is component without name, ${node.xPath}`);
          }
          addImportedComponent(name);
          return componentNameToJSX(name);
        })();
  };

  const adaptTemplateToJSX = (html: string) =>
    replaceClassField(replaceInlineTagClosing(replaceComponentJSXName(html)));

  const jsxContent = adaptTemplateToJSX(tagProcessor(node, true).outerHTML);

  const file = `import React from 'react';
import ${importScssFileAs} from './${componentName}.module.scss'
${importedComponents.map((name) => `import ${name} from './${name}'`).join(`
`)}

interface I${componentName}Props {}

const ${componentName} = (props: I${componentName}Props) => {
  return (
    ${jsxContent}
  )
}

export default ${componentName}
`;

  return { file, cssClassesList };
}

export function createComponentFiles(globalState: GlobalState, node: ExtendedNode): Record<string, string> {
  const filesMap: Record<string, string> = {};
  const name = getComponentName(node.name);

  try {
    const { file: reactFile, cssClassesList } = createReactComponent(node);

    filesMap[name + '.tsx'] = reactFile;
    filesMap[name + '.module.scss'] = createScssComponent(globalState, node, cssClassesList);
  } catch (e: any) {
    alert(e.message);
    console.error(e.message);
  }

  return filesMap;
}
