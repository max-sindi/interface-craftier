import React, { useContext } from 'react';
import IconButton from 'src/core/TagManager/IconButton';
import { IoMdAdd } from 'react-icons/io';
import { IoDuplicateOutline } from 'react-icons/io5';
import { MdCopyright, MdSettingsOverscan } from 'react-icons/md';
import { HiClipboardCopy } from 'react-icons/hi';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ExtendedNode } from 'src/core/ExtendedNode';
import Switch from 'src/core/UI/Switch';
import { BsBullseye } from 'react-icons/bs';
import { CgErase } from 'react-icons/cg';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaReact, FaRegWindowClose } from 'react-icons/fa';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { TbSquareLetterA } from 'react-icons/tb';

interface ITagActionsPanelProps {}

type StyleToCopy = Pick<ExtendedNode, 'style' | 'className'>;

export const aquaColor = '#00d2ff';

const TagActionsPanel = (props: ITagActionsPanelProps) => {
  const {
    nodeApi: {
      wrapNode,
      addBlockNode,
      addTextNode,
      duplicateNode,
      scrollIntoView,
      toggleReactComponent,
      nodeState: { style, className, deepIndex, reactComponent },
      changeStyles,
      changeClassNames,
      changeReactComponent,
      unselectCurrentNode,
      deleteThisNode,
      eraseStyling,
    },
  } = useContext(EachTagManagerProviderContext);

  const styleToCopy = JSON.stringify({ className, style } as StyleToCopy);
  const pasteStyleFromClipboard = async () => {
    const data = await navigator.clipboard.readText();

    try {
      const parsedData = JSON.parse(data) as StyleToCopy;
      changeClassNames({ ...className, ...parsedData.className });
      changeStyles({ ...style, ...parsedData.style });
    } catch (e) {
      console.error('Error while parse');
    }
  };

  return (
    <div className={'ml-a pr-10 pt-5 d-flex flex-wrap relative '} data-name={'TagActionsPanel'}>
      <IconButton centering onClick={scrollIntoView} title={'Scroll into view'}>
        <BsBullseye />
      </IconButton>
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
        <AiOutlinePlusSquare className={'pointer'} onClick={addBlockNode} title={'Add block child'} />
      </IconButton>
      <IconButton centering onClick={addTextNode} title={'Add text child'}>
        <TbSquareLetterA />
      </IconButton>
      {deepIndex > 0 && (
        <>
          <IconButton centering title={'Wrap'} onClick={wrapNode}>
            <MdSettingsOverscan className={'w-25 h-25'} />
          </IconButton>
          <IconButton centering>
            <IoDuplicateOutline title={'Duplicate'} className={'pointer'} onClick={duplicateNode} />
          </IconButton>
        </>
      )}
      <IconButton centering onClick={pasteStyleFromClipboard}>
        <HiClipboardCopy className={'pointer'} title={'Paste style from clipboard'} />
      </IconButton>

      <IconButton centering onClick={toggleReactComponent} title={'React component'}>
        <FaReact color={reactComponent ? aquaColor : ''} />
      </IconButton>
      {deepIndex > 0 && (
        <IconButton centering onClick={deleteThisNode} title={'Delete this node'}>
          <RiDeleteBin6Line size={16} />
        </IconButton>
      )}
      <IconButton
        centering
        onClick={(evt) => {
          evt.stopPropagation();
          unselectCurrentNode();
        }}
        title={'Close Popup '}
      >
        <FaRegWindowClose size={20} />
      </IconButton>
    </div>
  );
};

export default TagActionsPanel;
