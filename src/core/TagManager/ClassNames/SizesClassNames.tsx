import React from 'react';
import styles from 'src/stylotron/src/styles.json';
import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameChange, detectUnit, extractNumber } from 'src/utils';
import clsx from 'classnames';

const resizableClassConfigs = [
  'fz',
  'w',
  'h',
  'max-w',
  'min-w',
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
  'bw',
  'bt',
  'br',
  'bb',
  'bl',
].map((name) =>
  styles.classBranches.find((classBranch) => classBranch.name === name)
) as typeof styles['classBranches'];

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
          <div key={cssBranch.property} className={'d-flex mb-15 mt-5'}>
            <div>
              <div className={'pr-5'}>{cssBranch.property}:</div>
              {currentValue && (
                <div className={'mt-10 w-15 h-15 pointer'} style={{ background: 'red' }} onClick={onResetClassName} />
              )}
            </div>
            <div className={'d-flex flex-wrap min-w-700'}>
              {(['px', '%', 'vh'] as UnitName[]).map((unit) => {
                const list = cssBranch.units && cssBranch.units[unit];

                return !list ? null : (
                  <div className={'classNameButtonsWrapper'} style={{}} key={unit}>
                    <div className="d-flex justify-space-between">
                      <div>
                        {currentValue && detectUnit(currentValue) === unit && (
                          <div className={'ml-5 mt-5 pl-10 fw-700 fz-13 card'}>{extractNumber(currentValue)}</div>
                        )}
                      </div>
                      {/*{currentValue && detectUnit(currentValue)}*/}
                      <div className={'pr-10'}>{unit}</div>
                    </div>
                    <div className={'d-flex flex-wrap mt-5'}>
                      {list.map((className) => {
                        const onChange = () =>
                          changeClassName({
                            ...classNameRecord,
                            [cssBranch.name]: className.name,
                          });
                        const isActive = className.name === classNameRecord[cssBranch.name];
                        const nthChild5 = (className.integer || 0) % 5 === 0;

                        return (
                          <div
                            className={clsx([
                              ' d-flex flex-center classNameButton',
                              isActive && 'active',
                              nthChild5 && 'nthChild5',
                            ])}
                            onClick={onChange}
                          >
                            {className.integer}
                          </div>
                        );
                        // ((ch) =>
                        //   /*prevInteger % 5 === 1*/ false ? (
                        //     <div className={'w-100-p d-flex flex-wrap'}>{ch}</div>
                        //   ) : (
                        //     ch
                        //   ))(
                        // );
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
