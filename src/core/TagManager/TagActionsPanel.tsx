import React, { useContext } from 'react';
import IconButton from 'src/core/TagManager/IconButton';
import { IoMdAdd } from 'react-icons/io';
import { IoDuplicateOutline } from 'react-icons/io5';
import { MdCopyright } from 'react-icons/md';
import { HiClipboardCopy } from 'react-icons/hi';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import WrapIcon from 'src/core/UI/svg/WrapIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ExtendedNode } from 'src/core/ExtendedNode';

interface ITagActionsPanelProps {}

type StyleToCopy = Pick<ExtendedNode, 'style' | 'className'>;

const TagActionsPanel = (props: ITagActionsPanelProps) => {
  const {
    nodeApi: {
      wrapNode,
      addBlockNode,
      addTextNode,
      duplicateNode,
      nodeState: { style, className, deepIndex }, changeStyles, changeClassNames
    },
  } = useContext(EachTagManagerProviderContext);

  const styleToCopy = JSON.stringify({ className, style } as StyleToCopy);
  const pasteStyleFromClipboard = async () => {
    const data = await navigator.clipboard.readText();

    try {
      const parsedData = JSON.parse(data) as StyleToCopy ;
      changeClassNames({...className, ...parsedData.className})
      changeStyles({...style, ...parsedData.style})
    } catch (e) {
      console.error('Error while parse');
    }
  };

  return (
    <div className={'ml-a pr-10 d-flex relative '} data-name={'TagActionsPanel'}>
      <IconButton centering>
        <CopyToClipboard
          text={styleToCopy}
          onCopy={async () => {
            console.log(await navigator.clipboard.readText());
          }}
        >
          <MdCopyright className={'pointer'} title={'Copy style'} />
        </CopyToClipboard>
      </IconButton>
      <IconButton centering>
        <IoMdAdd className={'pointer'} onClick={addBlockNode} title={'Add block child'} />
      </IconButton>
      <IconButton centering>
        <div className={'pointer'} onClick={addTextNode} title={'Add text child'}>
          +A
        </div>
      </IconButton>
      {deepIndex > 0 && (
        <>
          <IconButton centering className={'d-flex flex-center'} title={'Wrap'} onClick={wrapNode}>
            <WrapIcon className={'w-25 h-25'} />
          </IconButton>
          <IconButton centering>
            <IoDuplicateOutline title={'Duplicate'} className={'pointer'} onClick={duplicateNode} />
          </IconButton>
        </>
      )}
      <IconButton centering onClick={pasteStyleFromClipboard}>
        <HiClipboardCopy className={'pointer'} title={'Paste style from clipboard'} />
      </IconButton>
    </div>
  );
};

export default TagActionsPanel;
