import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { globalStateSelector } from 'src/core/store/modules/template/selector';
import { compiledProjectArchivePath  } from 'src/utils';
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'src/axios';
import { compileStateToProduction } from 'src/utils/compileStateToProduction';

interface ICopyToClipboardToolbarProps {}

const CopyToClipboardToolbar = (props: ICopyToClipboardToolbarProps) => {
  // const [toolbarCollapsed, setToolbarCollapsed] = useState(true);
  // const toggleToolbarVisibility = () => setToolbarCollapsed((prev) => !prev);
  // const globalState = useSelector(globalStateSelector);
  // const readyState = useMemo(() => (toolbarCollapsed ? '' : compileStateToProduction(globalState)), [toolbarCollapsed]);

  const onCopy = async (text: string) => {
    // console.log(JSON.stringify(readyState))
    // alert(JSON.stringify(readyState))
    // await axios.get('/api/wace/compile')
    // window.open('http://localhost:8000/' + compiledProjectArchivePath)
  };

  return (
    <div className={'fixed t-30 r-30 h-30 pointer d-flex align-center'}>
      {/*{!toolbarCollapsed && (*/}
      {/*  <CopyToClipboard text={JSON.stringify(readyState)} onCopy={onCopy}>*/}
      {/*    <button onClick={() => console.log(`${JSON.stringify(readyState)}`)} className="pointer">Get Ready Markup</button>*/}
      {/*  </CopyToClipboard>*/}
      {/*)}*/}

      {/*<div className={'pointer'} onClick={toggleToolbarVisibility}>*/}
      {/*  {toolbarCollapsed ? <BsArrowsExpand /> : <BsArrowsCollapse />}*/}
      {/*</div>*/}
    </div>
  );
};

export default CopyToClipboardToolbar;
