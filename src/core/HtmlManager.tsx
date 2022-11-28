import React , { useCallback } from 'react';
import EachTagManager from './TagManager/EachTagManager';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNodeSelector ,
  globalStateSelector ,
  inspectedNodeSelector
} from 'src/core/store/modules/template/selector';
import { resetStateAction , selectRootAction } from 'src/core/store/modules/template/actions';
import { compileStateToProduction } from 'src/utils';
import CopyToClipboardToolbar from 'src/core/CopyToClipboardToolbar';

const HtmlManager = () => {
  const inspectedNodeId = useSelector(inspectedNodeSelector);
  const nodeSelector = useCallback(createNodeSelector(inspectedNodeId || '0'), [inspectedNodeId]);
  const nodeState = useSelector(nodeSelector);
  const dispatch = useDispatch();
  const resetState = () => dispatch(resetStateAction());
  const selectRoot = () => dispatch(selectRootAction())


  return (
    <div className={'html-manager'}>
      <div id="toolbar" className={'fixed b-20 l-50-p transform-left-center'}>
        {(!inspectedNodeId || !nodeState) ? (
          <div>
            <img
              src="https://cdn2.iconfinder.com/data/icons/visual-empty-state/32/No_Data_Found_Not_Found_Lost_Searching_Search-1024.png"
              alt="No data"
              width={50}
              height={50}
              className={'mr-a ml-a d-block'}
            />
            <div className={`text-center pointer pt-10 pb-10`} onClick={selectRoot}>Select Root</div>
          </div>
        ) : (
          <EachTagManager nodeId={inspectedNodeId} />
        )}
      </div>

      {/* Reset State button */}
      {/*<button className="fixed t-30 r-30 pointer" onClick={resetState}>*/}
      {/*  Reset state*/}
      {/*</button>*/}
      <CopyToClipboardToolbar />

    </div>
  );
};

export default HtmlManager;
