import React, { useContext } from 'react';
import Tooltip from 'rc-tooltip';
import cc from 'classnames';
import { BiLayer } from 'react-icons/bi';
import { IoMdReturnLeft } from 'react-icons/io';
import 'react-tabs/style/react-tabs.css';
import TreeNavigation from 'src/core/TagManager/TreeNavigation';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import TagDetails from 'src/core/TagManager/TagDetails';
import { capitalize } from 'lodash';
import TagActionsPanel from 'src/core/TagManager/TagActionsPanel';
import Search from './Search';
import clsx from 'classnames';

function Toolbar() {
  const {
    parentNodeApi,
    nodeApi: { nodeState, selectParent, rendererTagSelect },
  } = useContext(EachTagManagerProviderContext);
  return (
    <div id={'toolbar'}>
      <div
        data-name={'Tree navigation module'}
        className={clsx([
          `w-50-p relative pr-10 d-flex flex-column`,
        ])}
      >
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

        <div data-name={'Tree Navigation'} className={'relative pt-10 pb-30'}>
          <TreeNavigation />
        </div>
      </div>
      <div
        data-name={'Tag details module'}
        className={clsx(['relative grow-1 overflow-auto pl-20 w-50-p', /*activeModule === 'TAG_DETAILS' ? 'w-60-p' : 'w-40-p'*/])}
      >
        {!nodeState.isText && <TagDetails />}
      </div>
    </div>
  );
}

export default Toolbar;
