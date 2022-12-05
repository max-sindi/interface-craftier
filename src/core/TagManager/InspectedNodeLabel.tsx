import React, { useContext } from 'react';
import { labelFontSize, levelDeepPx } from 'src/utils';
import EditableField from 'src/core/TagManager/EditableField';
import IconButton from 'src/core/TagManager/IconButton';
import { IoMdAdd } from 'react-icons/io';
import { TbPlaylistAdd } from 'react-icons/tb';
import RecursivelyRenderTagLabels from 'src/core/TagManager/RecursivelyRenderTagLabels';
import { useSelector } from 'react-redux';
import { nodesMapSelector } from 'src/core/store/modules/template/selector';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';

interface IInspectedNodeLabelProps {}

const InspectedNodeLabel = (props: IInspectedNodeLabelProps) => {
  const {
    nodeApi: { nodeState, changeName, changeText, addBlockNode, addTextNode },
  } = useContext(EachTagManagerProviderContext);

  return (
    <div style={{ fontSize: labelFontSize + 1 }}>
      <input type="text" className="label-focus" key={nodeState.id} autoFocus={true} />
      {/* Name */}
      {!nodeState.isText && (
        <div className="flex">
          <div className="flex w-400">
            <div>{'Name: '}</div>
            <EditableField
              notEditElement={nodeState.name || '-'}
              editElement={
                <input
                  type="text"
                  data-name={'text-field'}
                  value={nodeState.name}
                  onChange={changeName}
                  autoFocus={true}
                  style={{ fontSize: labelFontSize + 1 }}
                  className={'edit-text-input w-90-p ml-5'}
                />
              }
            />
          </div>
          <IconButton centering>
            <IoMdAdd className={'pointer'} onClick={addBlockNode} title={'Add block child'} />
          </IconButton>
          <IconButton centering>
            <TbPlaylistAdd className={'pointer'} onClick={addTextNode} title={'Add text child'} />
          </IconButton>
        </div>
      )}
      {/* Children */}
      <div data-name={'children-navigation'}>
        {nodeState.isText && (
          /* Text child */
          <div className={'flex relative'}>
            <div>{'Text: '}</div>
            <EditableField
              initiallyEditable={true}
              notEditElement={<span className={'node-text'}>{nodeState.text}</span>}
              editElement={
                <textarea
                  rows={1 + nodeState.text.length / 37}
                  value={nodeState.text}
                  onChange={changeText}
                  autoFocus={true}
                  style={{ fontSize: labelFontSize + 1 }}
                  className={'edit-text-input w-90-p ml-5'}
                />
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectedNodeLabel;
