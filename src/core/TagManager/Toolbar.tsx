import React, { useCallback, useContext } from 'react';
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
import TagDetails from 'src/core/TagManager/TagDetails';
import AppManager from 'src/core/AppManager';

export type IEachTagManagerProps = {};

function Toolbar(props: IEachTagManagerProps) {
  const {
    parentNodeApi,
    nodeApi: { nodeState, unselectCurrentNode, selectParent, onHighlight, deleteThisNode, rendererTagSelect },
  } = useContext(EachTagManagerProviderContext);

  const { toggleToolbarVisibility, toolbarCollapsed } = useContext(ProjectContext);

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

  const onDeleteThisNode = () => {
    selectParent();
    deleteThisNode();
  };

  return (
    <div className={cc('relative min-h-20')}>
      <div data-name={'Toggle or Expand menu'} className={'absolute r-5 b-0 pointer'} onClick={toggleToolbarVisibility}>
        {toolbarCollapsed ? <BsArrowsExpand /> : <BsArrowsCollapse />}
      </div>

      <div className={!toolbarCollapsed ? '' : 'd-none'}>
        <div className={'min-h-250'}>{!nodeState.isText && <TagDetails />}</div>

        <div className="flex flex-wrap align-center pt-10 h-70">
          <Tooltip overlay={'Level Up'} placement={'top'}>
            <div onClick={selectParent} className={cc('flex align-center pr-5 pointer')}>
              <IoMdReturnLeft />
            </div>
          </Tooltip>
          <Tooltip overlay={'Deep level'} placement={'top'}>
            <div className={'d-inline-flex align-center pointer'}>
              <BiLayer /> <span>{nodeState.deepIndex + 1}</span>
            </div>
          </Tooltip>
          <Tooltip overlay={'Child level'} placement={'top'}>
            <div className={'d-inline-flex align-center ml-5'}>
              <BiLayer className={'rotate-90'} /> <span>{nodeState.childIndex + 1}</span>
            </div>
          </Tooltip>
          {!nodeState.isText && (
            <div data-name={'Tag Select'} className={`flex align-center ml-10`}>
              <div className={`pr-5`}>{'Tag:'}</div>
              {rendererTagSelect()}
            </div>
          )}
          {/*<button onClick={() => onHighlight()} className={`ml-20 pointer fz-13`}>*/}
          {/*  {'Highlight'}*/}
          {/*</button>*/}
          <div className={'flex align-center justify-space-between w-100-p'}>
            {nodeState.deepIndex > 0 && (
              <RiDeleteBin6Line
                data-name={'Delete this node'}
                onClick={onDeleteThisNode}
                size={25}
                className={'ml-50 pointer'}
              />
            )}
            <FaRegWindowClose
              data-name={'Close Popup '}
              onClick={unselectCurrentNode}
              size={20}
              className={` z-index-5 mr-20 pointer`}
            />
          </div>
        </div>

        <div data-name={'Tree Navigation'} className={'overflow-hidden mt-10 relative'}>
          <div className={`tree-navigation-shadow absolute t-0 l-0 w-100-p`} />
          <div className={`tree-navigation-shadow absolute b-0 l-0 w-100-p`} />
          <TreeNavigation />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
