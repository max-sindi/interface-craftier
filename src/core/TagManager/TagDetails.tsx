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
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      forceRenderTabPanel
      onMouseEnter={onMouseEnter}
      className={`ml-10`}
    >
      <TabPanel>
        <div data-name={'Layout'} className="tabPanel">
          <div className='h-100 mt-30 relative toolbar-resizer'>

            <Resizers
              changeClassName={changeClassNamesList}
              classNameRecord={nodeState.className}
              nodeId={nodeId}
            />
          </div>
        </div>
      </TabPanel>

      <TabPanel>
        <div data-name={'Classes'} className={'tabPanel'}>
          <ClassNamesSelector
            changeClassName={changeClassNamesList}
            classNameRecord={nodeState.className}
            styleRecord={nodeState.style}
            changeStyles={changeStyles}
          />
        </div>
      </TabPanel>

      <TabPanel>
        <div data-name={"Styles"} className={'tabPanel'}>
          <ObjectEditor
            onChange={createChangeHandler('style')}
            value={nodeState.style as Record<string, string>}
            fields={stylesExisting}
            title={'Styles: '}
          />
        </div>
      </TabPanel>

      <TabPanel>
        <div data-name={"Attributes"} className={'tabPanel'}>
          <ObjectEditor
            onChange={createChangeHandler('attrs')}
            value={nodeState.attrs}
            fields={attrsExisting}
            title={'Attributes: '}
          />
        </div>
      </TabPanel>
      <TabPanel>
        <div data-name={'App'} className='tabPanel'>
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