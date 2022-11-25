import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameRecord } from 'src/core/Node';
import { DefaultClassName } from 'src/core/TagManager/Resize/classNamesConfig';

export type ClassNameChange = {
  changeClassName: (newClassNameList: ClassNameRecord) => void;
  classNameRecord: ClassNameRecord;
};

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
