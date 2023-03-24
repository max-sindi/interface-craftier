import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameRecord, StyleRecord, TagNode } from 'src/core/TagNode';
import { DefaultClassName } from 'src/core/TagManager/Resize/classNamesConfig';
import styles from '../src/stylotron/src/styles.json';
import { capitalize, cloneDeepWith, flatten } from 'lodash';
import { v4 as uuid } from 'uuid';
import { GlobalState, NodesMap } from 'src/core/store/modules/template/reducer';
import { ExtendedNode } from 'src/core/ExtendedNode';

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
export const greenColor = '#449147';
export const compiledProjectArchivePath = 'uploads/compiled_project.zip';

export const isNumber = (value: any) => Math.abs(value) >= 0;

export const extractNumber = (str: string) => {
  const potentialNumber = str
    .split('-')
    .filter((i) => isNumber(i))
    .join('');
  return isNumber(potentialNumber) && Number(potentialNumber);
};

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
  (prev: TagNode): TagNode => {
    return {
      ...prev,
      children: prev.children.filter((i, index) => index !== indexInLevel),
    };
  };

export const logObjectFields = (object: any) =>
  Object.keys(object).forEach((name) => console.log(name, ': ', object[name]));

export const cloneNode = (data: TagNode | ExtendedNode, nodesMap: NodesMap): TagNode | ExtendedNode =>
  cloneDeepWith(data, (target: TagNode) => ({
    ...target,
    id: uuid(),
    children: target.children.map((child) => cloneNode(nodesMap[child.id], nodesMap)),
  }));


export const prettifyStateToConsole = (value: string) => value.split('\\n').forEach(line => console.log(line) )

export const destructTree = (state: Omit<GlobalState, 'template'> & { template: TagNode }, prevNodesMap: NodesMap = {}) => {
  const nodesMap: NodesMap = {};

  const recursiveIterator = (
    node: TagNode,
    deepIndex: number,
    levelIndex: number,
    xPath: string,
    parentNode?: TagNode
  ) => {
    const extendedNode: ExtendedNode = {
      ...node,
      childrenCollapsed: !!prevNodesMap[node.id]?.childrenCollapsed,
      xPath,
      childIndex: levelIndex,
      deepIndex,
      parentId: parentNode?.id,
      children: node.children
        .filter(Boolean)
        .map((childNode, index) =>
          recursiveIterator(childNode, deepIndex + 1, index, `${xPath}.children[${index}]`, node)
        ),
    };

    // add node to map
    nodesMap[extendedNode.id] = extendedNode;

    return extendedNode;
  };

  const updatedTemplate = recursiveIterator(state.template, 0, 0, 'template');

  return { nodesMap, currentState: { ...state, template: updatedTemplate } };
};

export const isColor = (value: string) => value[0] === '#';
export const isGradient = (value: string) => !value.split('linear-gradient(')[0];
