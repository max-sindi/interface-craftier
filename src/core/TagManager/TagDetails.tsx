import React, { useContext, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Resizers from 'src/core/TagManager/Resize/Resizers';
import ClassNamesSelector from 'src/core/TagManager/ClassNamesSelector';
import ObjectEditor from 'src/core/TagManager/ObjectEditor';
import { attrsExisting, stylesExisting } from 'src/core/TagManager/config';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import AppManager from 'src/core/AppManager';

const TagDetails = () => {
  const {
    nodeApi: { nodeState, createChangeHandler, changeClassNamesList, changeStyles, onMouseEnter },
  } = useContext(EachTagManagerProviderContext);
  const nodeId = nodeState.id;
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      forceRenderTabPanel
      onMouseEnter={onMouseEnter}
      className={`ml-10 flex`}
    >
      <TabList className={`tab-list-container-rotate`}>
        <Tab className={``}>Class</Tab>
        <Tab className={``}>Styles</Tab>
        <Tab className={``}>Attrs</Tab>
        <Tab className={``}>App</Tab>
      </TabList>
      <TabPanel>
        <div data-name={'Classes'} className={'tabPanel'}>
          <div className="w-400 mb-20 relative toolbar-resizer">
            <Resizers changeClassName={changeClassNamesList} classNameRecord={nodeState.className} nodeId={nodeId} />
          </div>
          <ClassNamesSelector
            changeClassName={changeClassNamesList}
            classNameRecord={nodeState.className}
            styleRecord={nodeState.style}
            changeStyles={changeStyles}
          />
        </div>
      </TabPanel>

      <TabPanel>
        <div data-name={'Styles'} className={'tabPanel'}>
          <ObjectEditor
            onChange={createChangeHandler('style')}
            value={nodeState.style as Record<string, string>}
            fields={stylesExisting}
            title={'Styles: '}
          />
        </div>
      </TabPanel>

      <TabPanel>
        <div data-name={'Attributes'} className={'tabPanel'}>
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
    </Tabs>
  );
};

export default TagDetails;
