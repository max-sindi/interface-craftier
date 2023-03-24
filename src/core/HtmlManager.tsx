import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNodeSelector,
  globalStateSelector,
  inspectedNodeSelector,
} from 'src/core/store/modules/template/selector';
import CopyToClipboardToolbar from 'src/core/CopyToClipboardToolbar';
import EachTagManagerProvider from 'src/core/TagManager/EachTagManagerProvider';
import Toolbar from './TagManager/Toolbar';
import { fetchProjectStateAction, selectRootAction } from 'src/core/store/modules/template/actions';
import axios from 'src/axios';
import { compiledProjectArchivePath , prettifyStateToConsole } from 'src/utils';
import { AiOutlineDownload, AiOutlineEye } from 'react-icons/ai';
import IconButton from 'src/core/TagManager/IconButton';
import { compileStateToProduction } from 'src/utils/compileStateToProduction';

const HtmlManager = () => {
  const inspectedNodeId = useSelector(inspectedNodeSelector);
  const nodeSelector = useCallback(createNodeSelector(inspectedNodeId || '0'), [inspectedNodeId]);
  const nodeState = useSelector(nodeSelector);
  const dispatch = useDispatch();
  // const resetState = () => dispatch(resetStateAction());
  const selectRoot = () => dispatch(selectRootAction());
  const [online, setOnline] = useState(false);
  const globalState = useSelector(globalStateSelector);
  const [shouldDownload, setShouldDownload] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const readyState = useMemo(() => ((shouldDownload || shouldShow) ? compileStateToProduction(globalState) : ''), [shouldDownload, shouldShow]);

  useEffect(() => {
    const donwload = async () => {
      await axios.get('/api/wace/compile');
      window.open('http://localhost:8000/' + compiledProjectArchivePath);
    };

    if (shouldShow) {
      prettifyStateToConsole(JSON.stringify(readyState))
      // console.log();
      setShouldShow(false);
    }

    if (shouldDownload) {
      donwload();
      setShouldDownload(false);
    }

  }, [shouldDownload, shouldShow]);

  useEffect(() => {
    dispatch(fetchProjectStateAction());

    const ping = () => {
      axios
        .get('/api/services/ping')
        .then(() => setOnline(true))
        .catch(() => setOnline(false));
    };
    ping();
    setInterval(ping, 30000);
  }, []);

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

      {/* Online indicator */}
      <div className={'absolute t-2 r-2 d-flex'}>

          <IconButton
            style={{ background: online ? 'green ' : 'red' }}
            title={'Download result'}
            centering
            onClick={() => setShouldDownload(true)}
            className={'w-20 h-30  border-radius-50-p '}
          >
            <AiOutlineDownload color={'#fff'} />
          </IconButton>
          <IconButton
            style={{ background: online ? 'green ' : 'red' }}
            title={'Show result'}
            centering={true}
            onClick={() => setShouldShow(true)}
            className={'w-20 h-30  border-radius-50-p '}
          >
            <AiOutlineEye color={'#fff'} />
          </IconButton>
      </div>

      {inspectedNodeId && nodeState ? (
        <EachTagManagerProvider nodeId={nodeState.id}>
          <Toolbar />
        </EachTagManagerProvider>
      ) : (
        <div className={` text-center pointer pt-10 pb-10`} onClick={selectRoot}>
          Select Root
        </div>
      )}
      {/*  )}*/}
      {/*</div>*/}

      <CopyToClipboardToolbar />
    </div>
  );
};

export default HtmlManager;
