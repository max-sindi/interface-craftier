import React, { useContext } from 'react';
import IconButton from 'src/core/TagManager/IconButton';
import { IoMdAdd } from 'react-icons/io';
import { IoDuplicateOutline } from 'react-icons/io5';
import { TbPlaylistAdd } from 'react-icons/tb';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import WrapIcon from 'src/core/UI/svg/WrapIcon';

interface ITagActionsPanelProps {}

const TagActionsPanel = (props: ITagActionsPanelProps) => {
  const {
    nodeApi: { wrapNode, addBlockNode, addTextNode, nodeState, duplicateNode },
  } = useContext(EachTagManagerProviderContext);

  return (
    <div className={'ml-a pr-10 flex'} data-name={'TagActionsPanel'}>
      <IconButton centering>
        <IoMdAdd className={'pointer'} onClick={addBlockNode} title={'Add block child'} />
      </IconButton>
      <IconButton centering>
        <TbPlaylistAdd className={'pointer'} onClick={addTextNode} title={'Add text child'} />
      </IconButton>
      {nodeState.deepIndex > 0 && (
        <>
          <IconButton centering className={'w-25 h-25 pt-5'} title={'Wrap'} onClick={wrapNode}>
            <WrapIcon />
          </IconButton>
          <IconButton centering>
            <IoDuplicateOutline title={'Duplicate'} className={'pointer'} onClick={duplicateNode} />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default TagActionsPanel;
