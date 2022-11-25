import React , { useState } from 'react';
import { ClassNameChange } from 'src/utils';
import styles from 'src/stylotron/src/styles.json';
import ClassNameMultiSwitch from 'src/core/TagManager/ClassNameMultiSwitch';
import { Tab , TabList, TabPanel , Tabs } from 'react-tabs';

const withRanges = styles.classBranches.filter((branch) => (branch.range?.length || 0) > 1);
const withSingleValue = styles.classBranches.filter((branch) => (branch.range?.length || 0) === 1)
console.log(withSingleValue);
interface IClassNamesSelectorProps extends ClassNameChange {}

const ClassNamesSelector = ({ classNameRecord, changeClassName }: IClassNamesSelectorProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className={``}>
      <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        forceRenderTabPanel
        // onMouseLeave={onMouseLeave}
      >
        {/* 1 - Ranged */}
        <TabPanel>
          <div>
            {withRanges.map((branch) => (
              <div key={branch.name} className={'flex'}>
                <div className="w-130 flex align-center">{branch.name}</div>
                <ClassNameMultiSwitch
                  texts={branch.values || []}
                  onToggle={(value: string) => changeClassName({ ...classNameRecord, [branch.name]: value })}
                />
              </div>
            ))}
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
                  onChange={(evt: any) => {
                    changeClassName({ ...classNameRecord, [name]: evt.target.checked ? name : '' });
                  }}
                  value={name}
                />
              </div>
            ))}
          </div>
        </TabPanel>
        <TabList>
          <Tab>Ranged</Tab>
          <Tab>Flags</Tab>
        </TabList>
      </Tabs>
    </div>
  );
};

export default ClassNamesSelector;
