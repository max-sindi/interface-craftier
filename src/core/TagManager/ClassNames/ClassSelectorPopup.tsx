import React, { useContext, useState } from 'react';
import classes from 'src/core/TagManager/ClassNames/ClassNames.module.scss';
import clsx from 'classnames';
import { IClassSelectorProps } from 'src/core/TagManager/ClassNames/ClassSelector';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { UnitName } from 'src/stylotron/src/Unit';
import { detectUnit } from 'src/utils';

interface IClassSelectorPopupProps extends Omit<IClassSelectorProps, 'children'> {}

const ClassSelectorPopup = ({ values, name }: IClassSelectorPopupProps) => {
  const {
    nodeApi: {
      nodeState: { className },
      changeClassNames,
    },
  } = useContext(EachTagManagerProviderContext);
  const classNameValue = className[name];
  const [currentlyDisplayedUnitTab, setCurrentlyDisplayedUnitTab] = useState<UnitName>(
    (Array.isArray(values) || !classNameValue) ? 'px' : detectUnit(classNameValue)
  );
  const valuesToDisplay = Array.isArray(values) ? values : values[currentlyDisplayedUnitTab];

  return (
    <div className={classes.chooseButtonContainer}>
      {!Array.isArray(values) && (
        <div className={'d-flex flex-center mb-5 '}>
          {(['px', '%', 'vh'] as UnitName[]).map((unit) => (
            <div key={unit} className={clsx([classes.tabButton, currentlyDisplayedUnitTab === unit && classes.tabButtonActive])} onClick={() => setCurrentlyDisplayedUnitTab(unit)}>
              {unit}
            </div>
          ))}
        </div>
      )}
      {valuesToDisplay.map((classNameConfig) => {
        const onCLick = () => changeClassNames({ ...className, [name]: classNameConfig.name });
        const isSelected = classNameValue === classNameConfig.name;

        return (
          <div
            key={classNameConfig.name}
            className={clsx([classes.chooseButton, isSelected && classes.chooseButtonActive])}
            onClick={onCLick}
          >
            {typeof classNameConfig.integer === 'number' ? classNameConfig.integer : classNameConfig.name}
          </div>
        );
      })}
    </div>
  );
};

export default ClassSelectorPopup;
