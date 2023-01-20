import React , { useCallback , useEffect } from 'react';
import { useDispatch , useSelector } from "react-redux";
import {
  createNodeSelector ,
  inspectedNodeSelector
} from 'src/core/store/modules/template/selector';
import CopyToClipboardToolbar from 'src/core/CopyToClipboardToolbar';
import EachTagManagerProvider from 'src/core/TagManager/EachTagManagerProvider';
import Toolbar from './TagManager/Toolbar';
import { selectRootAction } from "src/core/store/modules/template/actions";

const HtmlManager = () => {
  const inspectedNodeId = useSelector(inspectedNodeSelector);
  const nodeSelector = useCallback(createNodeSelector(inspectedNodeId || '0'), [inspectedNodeId]);
  const nodeState = useSelector(nodeSelector);
  const dispatch = useDispatch();
  // const resetState = () => dispatch(resetStateAction());
  const selectRoot = () => dispatch(selectRootAction())

  useEffect(() => {
  // resetState()
  //   selectRoot()
  }, [])


  return (
    <div className={'html-manager'}>
      {/*<div id="toolbar" className={'fixed b-20 t-200 r-20 overflow-hidden'}>*/}
      {/*  {(!inspectedNodeId || !nodeState) ? (*/}
      {/*    <div>*/}
      {/*      <img*/}
      {/*        src="https://cdn2.iconfinder.com/data/icons/visual-empty-state/32/No_Data_Found_Not_Found_Lost_Searching_Search-1024.png"*/}
      {/*        alt="No data"*/}
      {/*        width={50}*/}
      {/*        height={50}*/}
      {/*        className={'mr-a ml-a d-block'}*/}
      {/*      />*/}
      {/*      <div className={` text-center pointer pt-10 pb-10`} onClick={selectRoot}>Select Root</div>*/}
      {/*      /!*<div className='mt-40 text-center'>*!/*/}
      {/*      /!*  <button className=" pointer" onClick={resetState}>*!/*/}
      {/*      /!*    Reset state*!/*/}
      {/*      /!*  </button>*!/*/}
      {/*      /!*</div>*!/*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {inspectedNodeId && nodeState ? (
        <EachTagManagerProvider nodeId={nodeState.id}>
          <Toolbar />
        </EachTagManagerProvider>
      ) : (
        <div className={` text-center pointer pt-10 pb-10`} onClick={selectRoot}>Select Root</div>
      )}
      {/*  )}*/}
      {/*</div>*/}

      <CopyToClipboardToolbar />
    </div>
  );
};

export default HtmlManager;
