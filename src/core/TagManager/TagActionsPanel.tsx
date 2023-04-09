import React, { useContext } from 'react';
import IconButton from 'src/core/TagManager/IconButton';
import { IoDuplicateOutline } from 'react-icons/io5';
import { MdCopyright, MdSettingsOverscan } from 'react-icons/md';
import { HiClipboardCopy } from 'react-icons/hi';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ExtendedNode } from 'src/core/ExtendedNode';
import { BsBullseye, BsFillEraserFill } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaReact, FaRegWindowClose } from 'react-icons/fa';
import { AiFillCopy, AiOutlinePlusSquare, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { TbSquareLetterA } from 'react-icons/tb';
import { StyleToCopy } from 'src/core/TagManager/useTagApi';
import { GiPlatform } from 'react-icons/gi';

interface ITagActionsPanelProps {}

export const aquaColor = '#00d2ff';

const TagActionsPanel = (props: ITagActionsPanelProps) => {
  const {
    parentNodeApi,
    nodeApi: {
      wrapNode,
      addBlockNode,
      addTextNode,
      duplicateNode,
      scrollIntoView,
      toggleReactComponent,
      nodeState,
      nodeState: { style, className, deepIndex, reactComponent },
      pasteStyleFromClipboard,
      pasteNodeFromClipboard,
      unselectCurrentNode,
      deleteThisNode,
      eraseStyling,
    },
  } = useContext(EachTagManagerProviderContext);

  const styleToCopy = JSON.stringify({ className, style } as StyleToCopy);
  const nodeToCopy = JSON.stringify(nodeState as ExtendedNode);

  return (
    <div className={'ml-a pr-10 pt-5 d-flex flex-wrap relative '} data-name={'TagActionsPanel'}>
      <IconButton centering onClick={scrollIntoView} title={'Scroll into view'}>
        <BsBullseye />
      </IconButton>
      <IconButton centering title={'Copy style'}>
        <CopyToClipboard
          text={styleToCopy}
          onCopy={async () => {
            console.log(await navigator.clipboard.readText());
          }}
        >
          <MdCopyright />
        </CopyToClipboard>
      </IconButton>
      <IconButton centering onClick={pasteStyleFromClipboard} title={'Paste style from clipboard'}>
        <HiClipboardCopy />
      </IconButton>
      <IconButton centering title={'Copy node'}>
        <CopyToClipboard
          text={nodeToCopy}
          onCopy={async () => {
            console.log(await navigator.clipboard.readText());
          }}
        >
          <AiFillCopy />
        </CopyToClipboard>
      </IconButton>
      <IconButton centering title={'Paste node from clipboard'} onClick={pasteNodeFromClipboard}>
        <GiPlatform />
      </IconButton>
      {parentNodeApi && (
        <IconButton centering title={'Add sibling'} onClick={() => parentNodeApi.addChild()}>
          <AiOutlineUsergroupAdd />
        </IconButton>
      )}
      <IconButton centering onClick={addBlockNode} title={'Add block child'} >
        <AiOutlinePlusSquare/>
      </IconButton>
      <IconButton centering onClick={addTextNode} title={'Add text child'}>
        <TbSquareLetterA />
      </IconButton>
      {deepIndex > 0 && (
        <>
          <IconButton centering title={'Wrap'} onClick={wrapNode}>
            <MdSettingsOverscan size={25} />
          </IconButton>
          <IconButton centering title={'Duplicate'} onClick={duplicateNode} >
            <IoDuplicateOutline/>
          </IconButton>
        </>
      )}
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
        title={'Close Popup'}
        onClick={(evt) => {
          evt.stopPropagation();
          unselectCurrentNode();
        }}
      >
        <FaRegWindowClose size={20} />
      </IconButton>
      <IconButton centering title={'Erase styling'} onClick={eraseStyling}>
        <BsFillEraserFill/>
      </IconButton>
    </div>
  );
};

export default TagActionsPanel;
