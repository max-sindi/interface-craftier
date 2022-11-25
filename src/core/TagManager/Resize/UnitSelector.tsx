import React from 'react';
import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameChange, ClassNameInterface } from 'src/utils';

interface IUnitSelectorProps extends ClassNameChange {
  classNameInterface: ClassNameInterface;
}

const UnitSelector = ({
  classNameInterface: { unit, changeUnit, defaultClassName, classNameRoot },
  classNameRecord,
  changeClassName,
}: IUnitSelectorProps) => {
  const onChangeUnit = (evt: any) => {
    changeUnit(evt);
    changeClassName({
      ...classNameRecord,
      [classNameRoot]:
        typeof defaultClassName === 'string' ? defaultClassName : defaultClassName[evt.target.value as UnitName],
    });
  };

  return (
    <div>
      <select value={unit} onChange={onChangeUnit} className={'p-0'}>
        {(['px', '%', 'vh'] as UnitName[]).map((unit) => (
          <option value={unit} key={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UnitSelector;
