import React, { useState } from 'react';
import Resize from 'src/core/TagManager/Resize/Resize';
import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameChange, detectUnit, extractNumber } from 'src/utils';

const widthDefaultClassName = {
  '%': 'w-100-p',
  px: 'w-1200',
  vh: 'w-100-vh',
};

const heightDefaultClassName = { '%': 'h-100-p', px: 'h-400', vh: 'h-100-vh' };

const DimensionsResize = (props: ClassNameChange) => {
  const { classNameRecord } = props;
  const [widthUnit, setWidthUnit] = useState<UnitName>(classNameRecord['w'] ? detectUnit(classNameRecord['w']) : '%');
  const [heightUnit, setHeightUnit] = useState<UnitName>(classNameRecord['h'] ? detectUnit(classNameRecord['h']) : '%');
  const widthInteger = extractNumber(classNameRecord['w'] || '0');
  const heightInteger = extractNumber(classNameRecord['h'] || '0');
  const onWidthUnitChange = (evt: any) => setWidthUnit(evt.target.value);
  const onHeightUnitChange = (evt: any) => setHeightUnit(evt.target.value);

  return (
    <>
      <Resize
        widthClassNameInterface={{
          changeUnit: onWidthUnitChange,
          classNameRoot: 'w',
          defaultClassName: widthDefaultClassName,
          integer: widthInteger || 0,
          unit: widthUnit,
        }}
        heightClassNameInterface={{
          changeUnit: onHeightUnitChange,
          classNameRoot: 'h',
          defaultClassName: heightDefaultClassName,
          integer: heightInteger || 0,
          unit: heightUnit,
        }}
        {...props}
      />
    </>
  );
};

export default DimensionsResize;
