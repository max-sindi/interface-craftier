import React, { useContext } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import Tooltip from 'rc-tooltip';
import { ProjectContext } from '../Project';
import cc from 'classnames';
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs';
import { BiLayer } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdReturnLeft } from 'react-icons/io';
import { CgErase } from 'react-icons/cg';
import 'react-tabs/style/react-tabs.css';
import TreeNavigation from 'src/core/TagManager/TreeNavigation';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import TagDetails from 'src/core/TagManager/TagDetails';
import { capitalize } from 'lodash';
import TagActionsPanel from 'src/core/TagManager/TagActionsPanel';
import IconButton from 'src/core/TagManager/IconButton';

function Toolbar() {
  const {
    parentNodeApi,
    nodeApi: { nodeState, unselectCurrentNode, selectParent, deleteThisNode, rendererTagSelect, eraseStyling },
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

  // const onDeleteThisNode = () => {
  //   selectParent();
  //   deleteThisNode();
  // };

  return (
    <div id={'toolbar'}>
      <div data-name={'Toggle or Expand menu'} className={'absolute r-5 b-0 pointer'} onClick={toggleToolbarVisibility}>
        {toolbarCollapsed ? <BsArrowsExpand /> : <BsArrowsCollapse />}
      </div>
      <div className={`w-50-p pr-10 d-flex flex-column`}>
        <div className="d-flex flex-wrap align-center pt-10 h-70">
          <Tooltip
            overlay={
              <div>
                {parentNodeApi?.nodeState ? ` Parent: ${capitalize(parentNodeApi.nodeState.name)}` : 'No parent'}
              </div>
            }
            placement={'top'}
          >
            <div onClick={selectParent} className={cc('d-flex align-center pr-5 pointer')}>
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
            <div data-name={'Tag Select'} className={`d-flex align-center ml-10`}>
              <div className={`pr-5`}>{'Tag:'}</div>
              {rendererTagSelect()}
            </div>
          )}
          <TagActionsPanel />
          {/*<button onClick={() => onHighlight()} className={`ml-20 pointer fz-13`}>*/}
          {/*  {'Highlight'}*/}
          {/*</button>*/}
          <div className={'d-flex align-center justify-space-between w-100-p'}>
            <IconButton centering className={'pointer'} onClick={eraseStyling}>
              <CgErase />
            </IconButton>
            {nodeState.deepIndex > 0 && (
              <RiDeleteBin6Line
                data-name={'Delete this node'}
                onClick={deleteThisNode}
                size={25}
                className={'ml-50 pointer'}
              />
            )}
            <FaRegWindowClose
              data-name={'Close Popup '}
              onClick={(evt) => {
                evt.stopPropagation();
                unselectCurrentNode();
              }}
              size={20}
              className={` z-index-5 mr-20 pointer`}
            />
          </div>
        </div>

        <div data-name={'Tree Navigation'} className={'overflow-auto mt-20 relative pt-30 pb-30'}>
          <div className={`tree-navigation-shadow absolute t-0 l-0 w-100-p`} />
          {/*<div className={`tree-navigation-shadow absolute b-0 l-0 w-100-p`} />*/}
          <TreeNavigation />
        </div>
      </div>
      <div className={'w-50-p pl-10'}>{!nodeState.isText && <TagDetails />}</div>
    </div>
  );
}

export default Toolbar;
