import React, { useContext } from 'react';
import EditableField from 'src/core/TagManager/EditableField';
import IconButton from 'src/core/TagManager/IconButton';
import { IoMdAdd } from 'react-icons/io';
import { TbPlaylistAdd } from 'react-icons/tb';
import Tooltip from 'rc-tooltip';
import TagChildMenu from 'src/core/TagManager/TagChildMenu';
import TagLabel from 'src/core/TagManager/TagLabel';
// import { NodeApi , useTagApi } from 'src/core/TagManager/useTagApi';
import { Uuid } from 'src/core/store/modules/template/reducer';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';

interface ITreeNavigationProps {}

const TreeNavigation = ({}: ITreeNavigationProps) => {
  const {
    parentNodeApi,
    nodeApi: { nodeState, changeName, selectParent, changeText, addBlockNode, addTextNode, deleteChild, selectChild },
  } = useContext(EachTagManagerProviderContext);

  return (
    <div>
      {/* Name */}
      <div className="flex pt-10 pb-5">
        <div>{'Name: '}</div>
        <EditableField
          notEditElement={nodeState.name || '-'}
          editElement={<input type="text" value={nodeState.name} onChange={changeName} autoFocus={true} />}
        />
      </div>
      {/* Children */}
      {/* Text */}
      <div data-name={'children-navigation'} className={'flex'}>
        {nodeState.isText ? (
          <>
            <div>{'Text: '}</div>
            <EditableField
              notEditElement={nodeState.text}
              editElement={
                <div>
                  <input type="text" value={nodeState.text} onChange={changeText} autoFocus={true} />
                </div>
              }
            />
          </>
        ) : (
          /* Children */
          <div className={'flex align-center '}>
            <div>{'Children: '}</div>
            <div className="flex flex-column">
              <IconButton centering>
                <IoMdAdd className={'pointer'} onClick={addBlockNode} title={'Add block child'} />
              </IconButton>
              <IconButton centering>
                <TbPlaylistAdd className={'pointer'} onClick={addTextNode} title={'Add text child'} />
              </IconButton>
            </div>
            {/* Map children */}
            <div className={'flex flex-wrap'}>
              {nodeState.children.map((child, index) => (
                <Tooltip
                  key={child.id}
                  placement={'top'}
                  overlay={() => <TagChildMenu key={child.id} deleteChild={() => deleteChild(index)} />}
                >
                  <TagLabel node={child} onClick={() => selectChild(child)} />
                </Tooltip>
              ))}
            </div>
          </div>
        )}
      </div>
      {parentNodeApi && parentNodeApi.nodeState && (
        <div className="flex">
          Parent:
          <TagLabel node={parentNodeApi.nodeState} onClick={selectParent} />
        </div>
      )}
    </div>
  );
};

export default TreeNavigation;
