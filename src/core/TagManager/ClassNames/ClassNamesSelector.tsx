import React, { useContext } from 'react';
import styles from 'src/stylotron/src/styles.json';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import classes from 'src/core/TagManager/ClassNames/ClassNames.module.scss';
import ClassSelector , { UnitsRecord } from "src/core/TagManager/ClassNames/ClassSelector";

const withIntegers = styles.classBranches.filter((branch) => branch.units);
const withOptions = styles.classBranches.filter((branch) => (branch.range?.length || 0) > 1);
const withSingleValue = styles.classBranches.filter((branch) => (branch.range?.length || 0) === 1);
// const withNumericRanges = styles.classBranches.filter((branch) =>
//   ['border-width', 'border-radius', 'fz', 'min-w', 'max-w', 'min-h', 'max-h'].includes(branch.name)
// );

// const defaultValues: Record<any, any> = {
//   'border-width': 0,
//   'border-radius': 0,
//   fz: 16,
// };

// const colorfulStyles = {
//   backgroundColor: undefined,
//   color: undefined,
//   borderColor: undefined,
// } as Partial<StyleRecord>;
//
// const notColorfulStyles = {
//   fontFamily: undefined,
// } as Partial<StyleRecord>;

interface IClassNamesSelectorProps {}

const ClassNamesSelector = ({}: IClassNamesSelectorProps) => {
  const {
    nodeApi: {
      nodeState: { id, className },
      changeClassNames,
    },
  } = useContext(EachTagManagerProviderContext);
  // const [tabIndex, setTabIndex] = useState(1);
  // const variables = useSelector(variablesSelector);

  return (
    <div className={`d-flex pr-20`}>
      <div className={classes.group}>
        sizes: <br />
        {withIntegers.map((cssBranch) => (
          <ClassSelector key={cssBranch.name} name={cssBranch.name} values={cssBranch.units as UnitsRecord}>
            {cssBranch.property || cssBranch.name}
          </ClassSelector>
        ))}
      </div>

      <div className={classes.group}>
        options: <br />
        {withOptions.map((cssBranch) => (
          <ClassSelector key={cssBranch.name} name={cssBranch.name} values={cssBranch.classes || []}>
            {cssBranch.name}
          </ClassSelector>
        ))}
      </div>

      <div className={classes.group}>
        withSingleValue: <br />
        {withSingleValue.map(({ name }, index) => (
          <div key={id + index + name} className={''}>
            <label htmlFor={`flag-${name}`}>{name}</label>
            <input
              type="checkbox"
              checked={!!className[name]}
              value={name}
              onChange={(evt: any) => {
                changeClassNames({ ...className, [name]: evt.target.checked ? name : '' });
              }}
            />
          </div>
        ))}
        {/*{withSingleValue.map(cssBranch => (*/}
        {/*  <ClassSelector>{cssBranch.name}</ClassSelector>*/}
        {/*))}*/}
      </div>
      {/*<Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} forceRenderTabPanel>*/}
      {/*  /!*<TabList>*!/*/}
      {/*  /!*  <Tab>Ranged</Tab>*!/*/}
      {/*  /!*  <Tab>Sizes</Tab>*!/*/}
      {/*  /!*  <Tab>Flags</Tab>*!/*/}
      {/*  /!*  <Tab>Variabled</Tab>*!/*/}
      {/*  /!*</TabList>*!/*/}

      {/*  /!* Ranged *!/*/}
      {/*  <TabPanel>*/}
      {/*    <div className={`overflow-auto`}>*/}
      {/*      {withRanges.map(({ name, ...branch }) => {*/}
      {/*        const values = ['', ...(branch.values || [])];*/}
      {/*        const range = ['', ...(branch.range || [])];*/}

      {/*        return (*/}
      {/*          <div key={id + name} className={'mb-10'}>*/}
      {/*            <div className="text-center mb-5">{name}</div>*/}
      {/*            <ClassNameMultiSwitch*/}
      {/*              texts={values}*/}
      {/*              selectedSwitch={range.findIndex((value) => classNameRecord[name] === value)}*/}
      {/*              onToggle={(value: string, index: number) =>*/}
      {/*                changeClassName({ ...classNameRecord, [name]: range[index] })*/}
      {/*              }*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*      /!*{withNumericRanges.map(({ name, ...branch }) => {*!/*/}
      {/*      /!*  const list = branch.units?.px;*!/*/}
      {/*      /!*  const value = classNameRecord[name] ? extractNumber(classNameRecord[name] as string) : undefined;*!/*/}

      {/*      /!*  return !list || !list[0] ? null : (*!/*/}
      {/*      /!*    <div className="d-flex align-center pt-5" key={id + name}>*!/*/}
      {/*      /!*      <div className="w-130 d-flex align-center">{name}</div>*!/*/}
      {/*      /!*      <InputRange*!/*/}
      {/*      /!*        min={list[0].integer}*!/*/}
      {/*      /!*        max={lastArrayItem(list).integer}*!/*/}
      {/*      /!*        value={value}*!/*/}
      {/*      /!*        defaultValue={defaultValues[name]}*!/*/}
      {/*      /!*        onChange={(newValue: string) => {*!/*/}
      {/*      /!*          const newClassName = list.find(({ integer }) => String(integer) === newValue);*!/*/}
      {/*      /!*          if (newClassName) {*!/*/}
      {/*      /!*            changeClassName({ ...classNameRecord, [name]: newClassName.name });*!/*/}
      {/*      /!*          }*!/*/}
      {/*      /!*        }}*!/*/}
      {/*      /!*      />*!/*/}
      {/*      /!*      <div className={'pl-5 pr-5'}>{value || '-'}</div>*!/*/}
      {/*      /!*      /!* Delete *!/*!/*/}
      {/*      /!*      <RiDeleteBin6Line*!/*/}
      {/*      /!*        onClick={() => changeClassName(deleteField(classNameRecord, name))}*!/*/}
      {/*      /!*        className={'pointer'}*!/*/}
      {/*      /!*      />*!/*/}
      {/*      /!*    </div>*!/*/}
      {/*      /!*  );*!/*/}
      {/*      /!*})}*!/*/}
      {/*    </div>*/}
      {/*  </TabPanel>*/}

      {/*  <TabPanel>*/}
      {/*    <div>*/}
      {/*      <SizesClassNames changeClassName={changeClassName} classNameRecord={classNameRecord} />*/}
      {/*    </div>*/}
      {/*  </TabPanel>*/}

      {/*  /!* Flags *!/*/}
      {/*  <TabPanel>*/}
      {/*    <div className={'max-h-400 overflow-auto d-flex flex-wrap'}>*/}
      {/*      {withSingleValue.map(({ name }, index) => (*/}
      {/*        <div key={id + index + name} className={'w-50-p'}>*/}
      {/*          <label htmlFor={`flag-${name}`}>{name}</label>*/}
      {/*          <input*/}
      {/*            type="checkbox"*/}
      {/*            checked={!!classNameRecord[name]}*/}
      {/*            value={name}*/}
      {/*            onChange={(evt: any) => {*/}
      {/*              changeClassName({ ...classNameRecord, [name]: evt.target.checked ? name : '' });*/}
      {/*            }}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </TabPanel>*/}
      {/*  /!*  Variabled *!/*/}
      {/*  <TabPanel>*/}
      {/*    <div className={'max-h-400 overflow-auto'}>*/}
      {/*      {Object.keys(colorfulStyles).map((item) => {*/}
      {/*        const range = ['', ...Object.values(variables).filter((value) => isColor(value))];*/}
      {/*        const labels = range.map(value => (Object.entries(variables).find(([, variable]) => variable === value) || [''])[0])*/}

      {/*        return (*/}
      {/*          <div className={'d-flex'} key={id + item}>*/}
      {/*            <div className={'w-200'}>{item}</div>*/}
      {/*            <ClassNameMultiSwitch*/}
      {/*              selectedSwitch={range.findIndex((value) => styleRecord[item as keyof StyleRecord] === value)}*/}
      {/*              texts={range}*/}
      {/*              labels={labels}*/}
      {/*              onToggle={(value) => changeStyles({ ...styleRecord, [item]: value })}*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*        );*/}
      {/*      })}*/}

      {/*      {Object.keys(notColorfulStyles).map((item) => {*/}
      {/*        const range = ['', ...Object.values(variables).filter((value) => !isColor(value) && !isGradient(value)) ];*/}
      {/*        return (*/}
      {/*          <div className={'d-flex'} key={id + item}>*/}
      {/*            <div className={'w-200'}>{item}</div>*/}
      {/*            <ClassNameMultiSwitch*/}
      {/*              selectedSwitch={range.findIndex((value) => styleRecord[item as keyof StyleRecord] === value)}*/}
      {/*              texts={range}*/}
      {/*              onToggle={(value) => changeStyles({ ...styleRecord, [item]: value })}*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*  </TabPanel>*/}
      {/*</Tabs>*/}
    </div>
  );
};

export default ClassNamesSelector;
