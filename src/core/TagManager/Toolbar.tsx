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
import Search from './Search';

function Toolbar() {
  const {
    parentNodeApi,
    nodeApi: { nodeState, unselectCurrentNode, selectParent, deleteThisNode, rendererTagSelect, eraseStyling },
  } = useContext(EachTagManagerProviderContext);

  const { toggleToolbarVisibility, toolbarCollapsed } = useContext(ProjectContext);

  return (
    <div id={'toolbar'}>
      <div data-name={'Toggle or Expand menu'} className={'absolute r-5 b-0 pointer'} onClick={toggleToolbarVisibility}>
        {toolbarCollapsed ? <BsArrowsExpand /> : <BsArrowsCollapse />}
      </div>
      <div className={`min-w-600 max-w-600 pr-10 d-flex flex-column`}>
        <div className="w-100-p pt-10 h-70">
          <div className={'d-flex justify-space-between'}>
            <div className={'d-flex'}>
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
            </div>
            <Search></Search>
          </div>
          <TagActionsPanel />
        </div>

        <div data-name={'Tree Navigation'} className={'overflow-auto relative pt-10 pb-30'}>
          {/*<div className={`tree-navigation-shadow absolute t-0 l-0 w-100-p`} />*/}
          {/*<div className={`tree-navigation-shadow absolute b-0 l-0 w-100-p`} />*/}
          <TreeNavigation />
        </div>
      </div>
      <div className={'grow-1 pl-10'}>{!nodeState.isText && <TagDetails />}</div>
    </div>
  );
}

export default Toolbar;
