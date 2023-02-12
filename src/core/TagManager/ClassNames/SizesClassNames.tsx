import React from 'react';

import styles from 'src/stylotron/src/styles.json';
import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameChange, detectUnit } from 'src/utils';
import clsx from 'classnames';

// const widthStyleConfig = styles.classBranches.find(classBranch => classBranch.name === 'w')
// const maxWidthStyleConfig = styles.classBranches.find(classBranch => classBranch.name === 'max-w')
// const minWidthStyleConfig = styles.classBranches.find(classBranch => classBranch.name === 'min-w')
// const heightStyleConfig = styles.classBranches.find(classBranch => classBranch.name === 'h')
// const maxHeightStyleConfig = styles.classBranches.find(classBranch => classBranch.name === 'max-h')
// const minHeightStyleConfig = styles.classBranches.find(classBranch => classBranch.name === 'min-h')

const resizableClassConfigs = [
  'w',
  'max-w',
  'min-w',
  'h',
  'min-h',
  'max-h',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  't',
  'r',
  'b',
  'l',
].map((name) =>
  styles.classBranches.find((classBranch) => classBranch.name === name)
) as typeof styles['classBranches'];

// console.log(widthStyleConfig);
// console.log(widthClassNameInstance);
// console.log(heightClassNameInstance);
interface ISizesClassNamesProps extends ClassNameChange {}

const SizesClassNames = ({ changeClassName, classNameRecord }: ISizesClassNamesProps) => {
  return (
    <>
      {resizableClassConfigs.map((cssBranch) => {
        const onResetClassName = () => {
          const clone = { ...classNameRecord };
          delete clone[cssBranch.name];
          changeClassName(clone);
        };
        const currentValue = classNameRecord[cssBranch.name];
        // console.log(cssBranch);
        return (
          <div key={cssBranch.property} className={'d-flex mb-15'}>
            <div>
              <div className={'pr-5'}>{cssBranch.property}:</div>
              {currentValue && currentValue}
              {currentValue && detectUnit(currentValue)}
              <div className={'ml-5 w-15 h-15 pointer'} style={{ background: 'red' }} onClick={onResetClassName} />
            </div>
            <div className={'d-flex flex-wrap min-w-700'}>
              {(['px', '%', 'vh'] as UnitName[]).map((unit) => {
                const list = cssBranch.units && cssBranch.units[unit];

                return !list ? null : (
                  <div className={'classNameButtonsWrapper'} style={{}}>
                    <div>{unit}</div>
                    <div className={'d-flex flex-wrap'}>
                      {list.map((className) => {
                        const onChange = () =>
                          changeClassName({
                            ...classNameRecord,
                            [cssBranch.name]: className.name,
                          });
                        const isActive = className.name === classNameRecord[cssBranch.name];
                        const nthChild5 = className.integer % 5 === 0

                        return ((ch) => (/*prevInteger % 5 === 1*/ false ? <div className={'w-100-p d-flex flex-wrap'}>{ch}</div> : ch))(
                          <div className={clsx([' d-flex flex-center classNameButton', isActive && 'active', nthChild5 && 'nthChild5'])} onClick={onChange}>
                            {className.integer}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SizesClassNames;
