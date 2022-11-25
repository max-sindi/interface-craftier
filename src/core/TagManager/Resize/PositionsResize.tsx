import React, { useState } from 'react';
import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameChange , detectUnit } from 'src/utils';
import ResizeSpaces, { extractClassNameValue } from 'src/core/TagManager/Resize/ResizeSpaces';

const PositionResize = (props: ClassNameChange) => {
  const { classNameRecord } = props;
  const [topUnit, setTopUnit] = useState<UnitName>(classNameRecord['t'] ? detectUnit(classNameRecord['t']) : 'px');
  const [bottomUnit, setBottomUnit] = useState<UnitName>(
    classNameRecord['b'] ? detectUnit(classNameRecord['b']) : 'px'
  );
  const [rightUnit, setRightUnit] = useState<UnitName>(classNameRecord['r'] ? detectUnit(classNameRecord['r']) : 'px');
  const [leftUnit, setLeftUnit] = useState<UnitName>(classNameRecord['l'] ? detectUnit(classNameRecord['l']) : 'px');
  const onTopUnitChange = (evt: any) => setTopUnit(evt.target.value);
  const onBottomUnitChange = (evt: any) => setBottomUnit(evt.target.value);
  const onRightUnitChange = (evt: any) => setRightUnit(evt.target.value);
  const onLeftUnitChange = (evt: any) => setLeftUnit(evt.target.value);
  const topInteger = extractClassNameValue(classNameRecord['t'] || '0');
  const bottomInteger = extractClassNameValue(classNameRecord['b'] || '0');
  const rightInteger = extractClassNameValue(classNameRecord['r'] || '0');
  const leftInteger = extractClassNameValue(classNameRecord['l'] || '0');

  return (
    <>
      <ResizeSpaces
        reverse
        title={'Positioning'}
        leftClassNameInterface={{
          changeUnit: onLeftUnitChange,
          classNameRoot: 'l',
          defaultClassName: 'l-0',
          integer: leftInteger,
          unit: leftUnit,
        }}
        rightClassNameInterface={{
          changeUnit: onRightUnitChange,
          classNameRoot: 'r',
          defaultClassName: 'r-0',
          integer: rightInteger,
          unit: rightUnit,
        }}
        bottomClassNameInterface={{
          changeUnit: onBottomUnitChange,
          classNameRoot: 'b',
          defaultClassName: 'b-0',
          integer: bottomInteger,
          unit: bottomUnit,
        }}
        topClassNameInterface={{
          changeUnit: onTopUnitChange,
          classNameRoot: 't',
          defaultClassName: 't-0',
          integer: topInteger,
          unit: topUnit,
        }}
        {...props}
      />
    </>
  );
};

export default PositionResize;
