import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameRecord, Node, StyleRecord } from 'src/core/Node';
import { DefaultClassName } from 'src/core/TagManager/Resize/classNamesConfig';
import styles from 'src/stylotron/src/styles.json';
import { capitalize, cloneDeepWith, flatten } from 'lodash';
import { v4 as uuid } from 'uuid';
import { GlobalState } from 'src/core/store/modules/template/reducer';
const hyperscript = require('hyperscript');

export type ClassNameChange = {
  changeClassName: (newClassRecord: ClassNameRecord) => void;
  classNameRecord: ClassNameRecord;
};

export type StyleChange = {
  changeStyles: (newStyleRecord: Partial<StyleRecord>) => void;
  styleRecord: StyleRecord;
};

export interface ClassNameInterface {
  classNameRoot: keyof ClassNameRecord;
  defaultClassName: DefaultClassName;
  unit: UnitName;
  changeUnit: (evt: any) => void;
  integer: number;
}

export const levelDeepPx = 15;
export const labelHeight = 26;
export const labelFontSize = 20;
export const greenColor = '#449147'

const isNumber = (value: string | number) => !Number.isNaN(+value);

export const extractNumber = (str: string) =>
  Number(
    str
      .split('-')
      .filter((i) => isNumber(i))
      .join('')
  );

export const lastArrayItem = (arr: any[]) => arr[arr.length - 1];

export const detectUnit = (str: string): UnitName => {
  const potentialUnit = str.split('-')[str.split('-').findIndex(isNumber) + 1];

  switch (potentialUnit) {
    case 'p':
      return '%';
    case 'vh':
      return 'vh';
    default:
      return 'px';
  }
};

export const findNewClassName = (
  className: ClassNameRecord,
  classNameInterface: ClassNameInterface,
  changeClassName: ClassNameChange['changeClassName'],
  delta: number
) => {
  const { classNameRoot, defaultClassName, unit } = classNameInterface;
  const classBranch = styles.classBranches.find((branch) => branch.name === classNameRoot);
  if (classBranch) {
    const units = classBranch.units && classBranch.units[unit];
    if (units) {
      const prevClassNameIndex = units.findIndex(({ name }) => name === (className[classNameRoot] || defaultClassName));
      const nextClassName = units[prevClassNameIndex + delta];
      if (nextClassName) {
        changeClassName({ ...className, [classNameRoot]: nextClassName.name });
      }
    }
  }
};

export const deleteField = (obj: Record<any, any>, field: string) => {
  const freshState = { ...obj };
  delete freshState[field];
  return freshState;
};

export const createDeleter =
  (indexInLevel: number) =>
  (prev: Node): Node => {
    return {
      ...prev,
      children: prev.children.filter((i, index) => index !== indexInLevel),
    };
  };

export const logObjectFields = (object: any) =>
  Object.keys(object).forEach((name) => console.log(name, ': ', object[name]));

export const cloneDeepWithUniqueId = (data: Node): Node =>
  cloneDeepWith(data, (target: Node) =>
    Array.isArray(target.children)
      ? { ...target, id: uuid(), children: target.children.map((child) => cloneDeepWithUniqueId(child)) }
      : target
  );

interface ClassNameForCompile {
  name: string;
  classNamesExisting: ClassNameRecord;
  classNamesVariabled: StyleRecord;
}

export const compileStateToProduction = (state: GlobalState) => {
  const classNamesForCreating: ClassNameForCompile[] = [];

  const tagProcessor = (node: Node): ReturnType<typeof hyperscript> => {
    const classNameConfig = ((): ClassNameForCompile => {
      const classNamesExisting = node.className;
      const classNamesVariabled = node.style;
      const name = !node.name ? '' :
        node.name
          .trim()
          .split(' ')
          .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
          .join('') || 'id-' + node.id;

      return { name, classNamesExisting, classNamesVariabled };
    })();

    const attrs = { ...node.attrs }

    if(classNameConfig.name) {
      classNamesForCreating.push(classNameConfig);
      attrs.className = classNameConfig.name
    }

    return hyperscript(
      node.tag,
      attrs,
      node.isText ? node.text : node.children.map(tagProcessor)
    );
  };

  const parsedTemplate = tagProcessor(state.template);

  return `
    ${Object.entries(state.variables).map(([key, value]) => `$${key}: ${value}`).join(`;
`)}${Object.keys(state.variables).length ? ';' : ''}
    ${classNamesForCreating
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
            .join('')}: $${
            (Object.entries(state.variables).find(([, value2]) => value === value2) || ['unset'])[0]
          }`
      ),
  ].join(`;
  `)}
}
`
      )
      .join('')}

    ${parsedTemplate.outerHTML}
  `;
};

