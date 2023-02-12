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
  const onResetClassName = () => {
    const clone = { ...classNameRecord }
    delete clone[classNameRoot]
    changeClassName(clone)
  }

  return (
    <div className={'d-flex align-center'}>
      <select value={unit} onChange={onChangeUnit} className={'p-0'}>
        {(['px', '%', 'vh'] as UnitName[]).map((unit) => (
          <option value={unit} key={unit}>
            {unit}
          </option>
        ))}
      </select>
      <span className={'ml-5 w-15 h-15 pointer'} style={{ background: 'red'}} onClick={onResetClassName}/>
    </div>
  );
};

export default UnitSelector;
