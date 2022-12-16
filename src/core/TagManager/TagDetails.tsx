import React , { useContext , useState } from 'react';
import { Tab , TabList , TabPanel , Tabs } from 'react-tabs';
import Resizers from 'src/core/TagManager/Resize/Resizers';
import ClassNamesSelector from 'src/core/TagManager/ClassNamesSelector';
import ObjectEditor from 'src/core/TagManager/ObjectEditor';
import { attrsExisting , stylesExisting } from 'src/core/TagManager/config';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import AppManager from 'src/core/AppManager';

interface ITagDetailsProps {
}

const TagDetails = ( props : ITagDetailsProps ) => {
  const {
    parentNodeApi,
    nodeApi: {
      nodeState,
      unselectCurrentNode,
      selectParent,
      onHighlight,
      createChangeHandler,
      changeClassNamesList,
      changeStyles,
      onMouseEnter,
      rendererTagSelect,
    },
  } = useContext(EachTagManagerProviderContext);
  const nodeId = nodeState.id;
  const [tabIndex, setTabIndex] = useState(4);

  return (

    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      forceRenderTabPanel
      onMouseEnter={onMouseEnter}
      className={`ml-10`}
    >
      {/* Layout */}
      <TabPanel>
        <div className="tabPanel">
          <div className='h-50 relative toolbar-resizer'>

            <Resizers
              changeClassName={changeClassNamesList}
              classNameRecord={nodeState.className}
              nodeId={nodeId}
            />
          </div>
        </div>
      </TabPanel>

      {/*2 Classes */}
      <TabPanel>
        <div className={'tabPanel'}>
          <ClassNamesSelector
            changeClassName={changeClassNamesList}
            classNameRecord={nodeState.className}
            styleRecord={nodeState.style}
            changeStyles={changeStyles}
          />
        </div>
      </TabPanel>

      {/* 3 - Styles */}
      <TabPanel>
        <div className={'tabPanel'}>
          <ObjectEditor
            onChange={createChangeHandler('style')}
            value={nodeState.style as Record<string, string>}
            fields={stylesExisting}
            title={'Styles: '}
          />
        </div>
      </TabPanel>

      {/* 4 - Attributes */}
      <TabPanel>
        <div className={'tabPanel'}>
          <ObjectEditor
            onChange={createChangeHandler('attrs')}
            value={nodeState.attrs}
            fields={attrsExisting}
            title={'Attributes: '}
          />
        </div>
      </TabPanel>
      {/* App */}
      <TabPanel>
        <div className='tabPanel'>
          <AppManager />
        </div>
      </TabPanel>
      <TabList>
        <Tab>Layout</Tab>
        <Tab>Classes</Tab>
        <Tab>Styles</Tab>
        <Tab>Attrs</Tab>
        <Tab>App</Tab>
      </TabList>
    </Tabs>
  );
};

export default TagDetails;