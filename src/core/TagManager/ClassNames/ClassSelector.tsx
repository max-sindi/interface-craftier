import React, { useContext, useMemo } from 'react';
import Tooltip from 'rc-tooltip';
import classes from 'src/core/TagManager/ClassNames/ClassNames.module.scss';
import clsx from 'classnames';
import { deleteField, detectUnit, extractNumber, isNumber } from 'src/utils';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ClassSelectorPopup from 'src/core/TagManager/ClassNames/ClassSelectorPopup';
import { UnitName } from 'src/stylotron/src/Unit';

export interface CssClassBranch {
  name: string;
  value: string;
  integer?: number;
  decoratorAfter: boolean;
  decoratorBefore: boolean;
}
export type UnitsRecord = Record<UnitName, CssClassBranch[]>;

export interface IClassSelectorProps {
  children: string;
  name: string;
  values: UnitsRecord | CssClassBranch[];
}

const ClassSelector = ({ children, values, name }: IClassSelectorProps) => {
  const {
    nodeApi: {
      nodeState: { className },
      changeClassNames,
    },
  } = useContext(EachTagManagerProviderContext);

  const classNameValue = className[name];

  const value = useMemo(() => {
    if (classNameValue) {
      const config = (
        Array.isArray(values) ? values : Object.values(values).reduce((acc, cur) => [...acc, ...cur], [])
      ).find((item) => item.name === classNameValue);

      if (config && config.integer) {
        return `${config.integer} ${detectUnit(classNameValue)}`;
      } else if (isNumber(extractNumber(classNameValue))) {
        return extractNumber(classNameValue);
      }
    }
  }, [classNameValue, values]);

  const onDeleteClassName = () => changeClassNames(deleteField(className, name));

  return (
    <div className={'pt-5'}>
      <div>
        <Tooltip placement={'left'} overlay={() => <ClassSelectorPopup values={values} name={name} title={children} />}>
          <div>
            <div>{children}</div>

            {(value || classNameValue) && (
              <div className={'d-flex align-center'}>
                <div className={clsx([classes.chooseButton, classes.chooseButtonActive])}>
                  {value || classNameValue}
                </div>
                <RiDeleteBin6Line onClick={onDeleteClassName} className={'pointer'} />
              </div>
            )}
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default ClassSelector;
