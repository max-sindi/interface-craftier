import React, { useState } from 'react';
import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameChange , detectUnit } from 'src/utils';
import ResizeSpaces , { extractClassNameValue } from 'src/core/TagManager/Resize/ResizeSpaces';

const PaddingResize = (props: ClassNameChange) => {
  const { classNameRecord } = props;
  const [topUnit, setTopUnit] = useState<UnitName>(classNameRecord['pt'] ? detectUnit(classNameRecord['pt']) : 'px');
  const [bottomUnit, setBottomUnit] = useState<UnitName>(classNameRecord['pb'] ? detectUnit(classNameRecord['pb']) : 'px');
  const [rightUnit, setRightUnit] = useState<UnitName>(classNameRecord['pr'] ? detectUnit(classNameRecord['pr']) : 'px');
  const [leftUnit, setLeftUnit] = useState<UnitName>(classNameRecord['pl'] ? detectUnit(classNameRecord['pl']) : 'px');
  const onTopUnitChange = (evt: any) => setTopUnit(evt.target.value);
  const onBottomUnitChange = (evt: any) => setBottomUnit(evt.target.value);
  const onRightUnitChange = (evt: any) => setRightUnit(evt.target.value);
  const onLeftUnitChange = (evt: any) => setLeftUnit(evt.target.value);
  const topInteger = extractClassNameValue(classNameRecord['pt'] || '0');
  const bottomInteger = extractClassNameValue(classNameRecord['pb'] || '0');
  const rightInteger = extractClassNameValue(classNameRecord['pr'] || '0');
  const leftInteger = extractClassNameValue(classNameRecord['pl'] || '0');

  return (
    <>
      <ResizeSpaces
        reverse
        title={'Spacing'}
        leftClassNameInterface={{
          changeUnit: onLeftUnitChange,
          classNameRoot: 'pl',
          defaultClassName: 'pl-0',
          integer: leftInteger,
          unit: leftUnit,
        }}
        rightClassNameInterface={{
          changeUnit: onRightUnitChange,
          classNameRoot: 'pr',
          defaultClassName: 'pr-0',
          integer: rightInteger,
          unit: rightUnit,
        }}
        bottomClassNameInterface={{
          changeUnit: onBottomUnitChange,
          classNameRoot: 'pb',
          defaultClassName: 'pb-0',
          integer: bottomInteger,
          unit: bottomUnit,
        }}
        topClassNameInterface={{
          changeUnit: onTopUnitChange,
          classNameRoot: 'pt',
          defaultClassName: 'pt-0',
          integer: topInteger,
          unit: topUnit,
        }}
        {...props}
      />
    </>
  );
};

export default PaddingResize;
