import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { globalStateSelector } from 'src/core/store/modules/template/selector';
import { compileStateToProduction } from 'src/utils';
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ICopyToClipboardToolbarProps {}

const CopyToClipboardToolbar = (props: ICopyToClipboardToolbarProps) => {
  const [toolbarCollapsed, setToolbarCollapsed] = useState(true);
  const toggleToolbarVisibility = () => setToolbarCollapsed((prev) => !prev);
  const globalState = useSelector(globalStateSelector);
  const readyState = useMemo(() => (toolbarCollapsed ? '' : compileStateToProduction(globalState)), [toolbarCollapsed]);

  const onCopy = (text: string) => {
    console.log('Copied content: ', text);
    setToolbarCollapsed(true);
  };

  return (
    <div className={'fixed t-30 r-30 h-30 pointer flex align-center'}>
      {!toolbarCollapsed && (
        <CopyToClipboard text={readyState} onCopy={onCopy}>
          <button className="pointer">Get Ready Markup</button>
        </CopyToClipboard>
      )}

      <div className={'pointer'} onClick={toggleToolbarVisibility}>
        {toolbarCollapsed ? <BsArrowsExpand /> : <BsArrowsCollapse />}
      </div>
    </div>
  );
};

export default CopyToClipboardToolbar;
