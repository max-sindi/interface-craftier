import React, { useState } from 'react';
import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameChange , detectUnit } from 'src/utils';
import ResizeSpaces , { extractClassNameValue } from 'src/core/TagManager/Resize/ResizeSpaces';

const getUnitPrefix = (unit: UnitName) => {
  switch ( unit ) {
    case '%':
      return '-p'
    case 'vh':
      return '-vh'
    default:
      return ''
  }
}

const MarginResize = (props: ClassNameChange) => {
  const { classNameRecord } = props;
  const [topUnit, setTopUnit] = useState<UnitName>(classNameRecord['mt'] ? detectUnit(classNameRecord['mt']) : 'px');
  const [bottomUnit, setBottomUnit] = useState<UnitName>(
    classNameRecord['mb'] ? detectUnit(classNameRecord['mb']) : 'px'
  );
  const [rightUnit, setRightUnit] = useState<UnitName>(
    classNameRecord['mr'] ? detectUnit(classNameRecord['mr']) : 'px'
  );
  const [leftUnit, setLeftUnit] = useState<UnitName>(classNameRecord['ml'] ? detectUnit(classNameRecord['ml']) : 'px');
  const onTopUnitChange = (evt: any) => setTopUnit(evt.target.value);
  const onBottomUnitChange = (evt: any) => setBottomUnit(evt.target.value);
  const onRightUnitChange = (evt: any) => setRightUnit(evt.target.value);
  const onLeftUnitChange = (evt: any) => setLeftUnit(evt.target.value);
  const topInteger = extractClassNameValue(classNameRecord['mt'] || '0');
  const bottomInteger = extractClassNameValue(classNameRecord['mb'] || '0');
  const rightInteger = extractClassNameValue(classNameRecord['mr'] || '0');
  const leftInteger = extractClassNameValue(classNameRecord['ml'] || '0');

  return (
    <>
      <ResizeSpaces
        title={'Margin'}
        leftClassNameInterface={{
          changeUnit: onLeftUnitChange,
          classNameRoot: 'ml',
          defaultClassName: 'ml-0' + getUnitPrefix(leftUnit),
          integer: leftInteger,
          unit: leftUnit,
        }}
        rightClassNameInterface={{
          changeUnit: onRightUnitChange,
          classNameRoot: 'mr',
          defaultClassName: 'mr-0' + getUnitPrefix(rightUnit),
          integer: rightInteger,
          unit: rightUnit,
        }}
        topClassNameInterface={{
          changeUnit: onTopUnitChange,
          classNameRoot: 'mt',
          defaultClassName: 'mt-0' + getUnitPrefix(topUnit),
          integer: topInteger,
          unit: topUnit,
        }}
        bottomClassNameInterface={{
          changeUnit: onBottomUnitChange,
          classNameRoot: 'mb',
          defaultClassName: 'mb-0' + getUnitPrefix(bottomUnit),
          integer: bottomInteger,
          unit: bottomUnit,
        }}
        {...props}
      />
    </>
  );
};

export default MarginResize;
