import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameRecord , Node , StyleRecord } from 'src/core/Node';
import { DefaultClassName } from 'src/core/TagManager/Resize/classNamesConfig';
import styles from 'src/stylotron/src/styles.json';
import { cloneDeepWith } from 'lodash';
import { v4 as uuid } from 'uuid';

export type ClassNameChange = {
  changeClassName: (newClassRecord: ClassNameRecord) => void;
  classNameRecord: ClassNameRecord;
};

export type StyleChange = {
  changeStyles: (newStyleRecord: Partial<StyleRecord>) => void
  styleRecord: StyleRecord
}

export interface ClassNameInterface {
  classNameRoot: keyof ClassNameRecord;
  defaultClassName: DefaultClassName;
  unit: UnitName;
  changeUnit: (evt: any) => void;
  integer: number;
}

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
  delta: number,
) => {
  const { classNameRoot, defaultClassName, unit } = classNameInterface
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

export const deleteField = (obj: Record<any , any>, field: string) => {
  const freshState = { ...obj }
  delete freshState[field]
  return freshState
}

export const createDeleter =
  (indexInLevel: number) =>
    (prev: Node): Node => {
      return {
        ...prev,
        children: prev.children.filter((i, index) => index !== indexInLevel),
      };
    };

export const cloneDeepWithUniqueId = (data: Node): Node =>
  cloneDeepWith(data, (target: Node) =>
    Array.isArray(target.children)
      ? { ...target, id: uuid(), children: target.children.map((child) => cloneDeepWithUniqueId(child)) }
      : target
  );