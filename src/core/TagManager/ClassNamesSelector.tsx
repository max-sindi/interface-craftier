import React, { useState } from 'react';
import { ClassNameChange, deleteField, extractNumber, lastArrayItem, StyleChange } from 'src/utils';
import styles from 'src/stylotron/src/styles.json';
import ClassNameMultiSwitch from 'src/core/TagManager/ClassNameMultiSwitch';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { StandardLonghandProperties } from 'csstype';
import { useSelector } from 'react-redux';
import { variablesSelector } from 'src/core/store/modules/template/selector';
import InputRange from 'src/core/UI/InputRange';
import { RiDeleteBin6Line } from 'react-icons/ri';

const withRanges = styles.classBranches.filter((branch) => (branch.range?.length || 0) > 1);
const withSingleValue = styles.classBranches.filter((branch) => (branch.range?.length || 0) === 1);
const withNumericRanges = styles.classBranches.filter((branch) =>
  ['border-width', 'border-radius', 'fz'].includes(branch.name)
);

const defaultValues: Record<any, any> = {
  'border-width': 0,
  'border-radius': 0,
  fz: 16,
};

interface IClassNamesSelectorProps extends ClassNameChange, StyleChange {}

const ClassNamesSelector = ({
  classNameRecord,
  changeClassName,
  styleRecord,
  changeStyles,
}: IClassNamesSelectorProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const variables = useSelector(variablesSelector);

  return (
    <div className={``}>
      <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        forceRenderTabPanel
      >
        {/* 1 - Ranged */}
        <TabPanel>
          <div className={`max-h-200 overflow-auto`}>
            {withRanges.map(({ name, ...branch }) => {
              const values = ['', ...(branch.values || [])]
              const range = ['', ...(branch.range || [])]

              return (
                <div key={name} className={'flex'}>
                  <div className="min-w-70 max-w-70 pr-5 flex align-center">{name}</div>
                  <ClassNameMultiSwitch
                    texts={values}
                    selectedSwitch={range.findIndex(value => classNameRecord[name] === value)}
                    onToggle={(value: string, index: number) =>
                      changeClassName({ ...classNameRecord, [name]: range[index] })
                    }
                  />
                </div>
              );
            })}
            {withNumericRanges.map(({ name, ...branch }) => {
              const list = branch.units?.px;
              const value = classNameRecord[name] ? extractNumber(classNameRecord[name] as string) : undefined;

              return !list || !list[0] ? null : (
                <div className="flex align-center pt-5" key={name}>
                  <div className="w-130 flex align-center">{name}</div>
                  <InputRange
                    min={list[0].integer}
                    max={lastArrayItem(list).integer}
                    value={value}
                    defaultValue={defaultValues[name]}
                    onChange={(newValue: string) => {
                      const newClassName = list.find(({ integer }) => String(integer) === newValue);
                      if (newClassName) {
                        changeClassName({ ...classNameRecord, [name]: newClassName.name });
                      }
                    }}
                  />
                  <div className={'pl-5 pr-5'}>{value || '-'}</div>
                  {/* Delete */}
                  <RiDeleteBin6Line
                    onClick={() => changeClassName(deleteField(classNameRecord, name))}
                    className={'pointer'}
                  />
                </div>
              );
            })}
          </div>
        </TabPanel>

        {/* 2 - Flags */}
        <TabPanel>
          <div className={'max-h-400 overflow-auto flex flex-wrap'}>
            {withSingleValue.map(({ name }, index) => (
              <div key={index + name} className={'w-50-p'}>
                <label htmlFor={`flag-${name}`}>{name}</label>
                <input
                  type="checkbox"
                  checked={!!classNameRecord[name]}
                  value={name}
                  onChange={(evt: any) => {
                    changeClassName({ ...classNameRecord, [name]: evt.target.checked ? name : '' });
                  }}
                />
              </div>
            ))}
          </div>
        </TabPanel>
        {/*  Variabled */}
        <TabPanel>
          <div className={'max-h-400 overflow-auto'} style={{}}>
            {Object.keys({
              backgroundColor: undefined,
              color: undefined,
              borderColor: undefined,
            } as StandardLonghandProperties).map((item) => (
              <div className={'flex'} key={item}>
                <div className={'w-200'}>{item}</div>
                <ClassNameMultiSwitch
                  texts={['', ...Object.values(variables).filter((value) => value[0] === '#')]}
                  onToggle={(value) => changeStyles({ ...styleRecord, [item]: value })}
                />
              </div>
            ))}
          </div>
        </TabPanel>
        <TabList>
          <Tab>Ranged</Tab>
          <Tab>Flags</Tab>
          <Tab>Variabled</Tab>
        </TabList>
      </Tabs>
    </div>
  );
};

export default ClassNamesSelector;
