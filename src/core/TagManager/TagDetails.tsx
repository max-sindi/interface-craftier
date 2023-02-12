import React, { useContext, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Resizers from 'src/core/TagManager/Resize/Resizers';
import ClassNamesSelector from 'src/core/TagManager/ClassNames/ClassNamesSelector';
import ObjectEditor from 'src/core/TagManager/ObjectEditor';
import { attrsExisting, stylesExisting } from 'src/core/TagManager/config';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import AppManager from 'src/core/AppManager';

const TagDetails = () => {
  const {
    nodeApi: { nodeState, createChangeHandler, changeClassNamesList, changeStyles, onMouseEnter },
  } = useContext(EachTagManagerProviderContext);
  const nodeId = nodeState.id;
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      forceRenderTabPanel
      onMouseEnter={onMouseEnter}
      className={`ml-10 d-flex max-h-100-p w-100-p`}
    >
      <TabList className={`tab-list-container-rotate`}>
        <Tab className={``}>Class</Tab>
        <Tab className={``}>Attrs</Tab>
        <Tab className={``}>App</Tab>
      </TabList>
      <div className={'overflow-auto'}>
        <TabPanel>
          <div data-name={'Classes'} className={'tabPanel'}>
            {/*<div className="w-400 mb-20 relative toolbar-resizer">*/}
            {/*  <Resizers changeClassName={changeClassNamesList} classNameRecord={nodeState.className} nodeId={nodeId} />*/}
            {/*</div>*/}
            <ClassNamesSelector
              changeClassName={changeClassNamesList}
              classNameRecord={nodeState.className}
              styleRecord={nodeState.style}
              changeStyles={changeStyles}
            />
          </div>
        </TabPanel>

        <TabPanel>
          <div data-name={'Attributes'} className={'tabPanel pr-20'}>
            <ObjectEditor
              onChange={createChangeHandler('style')}
              value={nodeState.style as Record<string, string>}
              fields={stylesExisting}
              title={'Styles: '}
            />
            <ObjectEditor
              onChange={createChangeHandler('attrs')}
              value={nodeState.attrs}
              fields={attrsExisting}
              title={'Attributes: '}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div data-name={'App'} className="tabPanel">
            <AppManager />
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TagDetails;
