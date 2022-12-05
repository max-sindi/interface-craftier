import React, { useCallback, useContext, useMemo, useState } from 'react';
// import { AiOutlineFileAdd } from 'react-icons/ai';
import { FaRegWindowClose } from 'react-icons/fa';
// import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import ClassNamesSelector from './ClassNamesSelector';
import ObjectEditor from './ObjectEditor';
// import SVGBlockToText from '../UI/svg/BlockToText';
import Tooltip from 'rc-tooltip';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ProjectContext } from '../Project';
import cc from 'classnames';
import { attrsExisting, stylesExisting, tags } from './config';
import { BsArrowsCollapse, BsArrowsExpand, /*BsArrowBarDown, BsArrowBarRight, */ BsFillPenFill } from 'react-icons/bs';
import { BiLayer } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdSquareOutline, IoMdReturnLeft, IoMdAdd } from 'react-icons/io';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Resizers from 'src/core/TagManager/Resize/Resizers';
import TreeNavigation from 'src/core/TagManager/TreeNavigation';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';

export type IEachTagManagerProps = {};

function EachTagManager(props: IEachTagManagerProps) {
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
  const { toggleToolbarVisibility, toolbarCollapsed } = useContext(ProjectContext);
  const [tabIndex, setTabIndex] = useState(3);

  const deleteThisNode = () => {
    parentNodeApi && parentNodeApi.deleteChild(nodeState.childIndex);
    selectParent();
  };
  // addNewChildFromPasted = () => {
  //   const parsedData = (() => {
  //     try {
  //       return JSON.parse(state.pastedData);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  //
  //   parsedData &&
  //     transformField((node) => ({ ...node, children: [...nodeState.children, cloneDeepWithUniqueId(parsedData)] }));
  // };

  return (
    <div className={cc('relative min-h-20')}>
      {/* Toggle or Expand menu */}
      <div className={'absolute r-5 b-0 pointer'} onClick={toggleToolbarVisibility}>
        {toolbarCollapsed ? <BsArrowsExpand /> : <BsArrowsCollapse />}
      </div>

      <div className={!toolbarCollapsed ? '' : 'd-none'}>
        {!nodeState.isText && (
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
            forceRenderTabPanel
            onMouseEnter={onMouseEnter}
          >
            {/* Layout */}
            <TabPanel>
              <div className="tabPanel">
                <Resizers
                  changeClassName={changeClassNamesList}
                  classNameRecord={nodeState.className}
                  nodeId={nodeId}
                />
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
            <TabList>
              {/*<Tab>Tree</Tab>*/}
              <Tab>Layout</Tab>
              <Tab>Classes</Tab>
              <Tab>Styles</Tab>
              <Tab>Attributes</Tab>
            </TabList>
          </Tabs>
        )}

        <div className="flex align-center pt-10">
          <Tooltip overlay={'Level Up'} placement={'top'}>
            <div onClick={selectParent} className={cc('flex align-center pr-5 pointer')}>
              <IoMdReturnLeft />
            </div>
          </Tooltip>
          {/* Deep level */}
          <Tooltip overlay={'Deep level'} placement={'top'}>
            <div className={'d-inline-flex align-center pointer'}>
              <BiLayer /> <span>{nodeState.deepIndex + 1}</span>
            </div>
          </Tooltip>
          {/* Child level */}
          <Tooltip overlay={'Child level'} placement={'top'}>
            <div className={'d-inline-flex align-center ml-5'}>
              <BiLayer className={'rotate-90'} /> <span>{nodeState.childIndex + 1}</span>
            </div>
          </Tooltip>
          {/* Tag */}
          {!nodeState.isText && (
            <div className={`flex align-center ml-10`}>
              <div className={`pr-5`}>Tag:</div>
              {rendererTagSelect()}
            </div>
          )}
          {/*Highlight*/}
          <div>
            <button onClick={() => onHighlight()} className={`ml-20 pointer fz-13`}>
              {'Highlight'}
            </button>
          </div>
          {/* Delete */}
          <RiDeleteBin6Line onClick={deleteThisNode} size={25} className={'ml-250'} />
          {/* Close Popup */}
          <Tooltip overlay={'Unselect'} placement={'top'}>
            <FaRegWindowClose onClick={unselectCurrentNode} size={20} className={`r-3 t-3 z-index-5 ml-a pointer`} />
          </Tooltip>
        </div>

        <div className={'overflow-hidden mt-10 relative'}>
          <div className={`tree-navigation-shadow absolute t-0 l-0 w-100-p`} />
          <div className={`tree-navigation-shadow absolute b-0 l-0 w-100-p`} />
          <TreeNavigation />
        </div>
      </div>
    </div>
  );
}

export default EachTagManager;
