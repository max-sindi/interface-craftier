import React, { useContext } from 'react';
import { labelFontSize } from 'src/utils';
import EditableField from 'src/core/TagManager/EditableField';
import IconButton from 'src/core/TagManager/IconButton';
import { IoMdAdd } from 'react-icons/io';
import { TbPlaylistAdd } from 'react-icons/tb';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import FocuserInput from 'src/core/TagManager/FocuserInput';
import TagActionsPanel from 'src/core/TagManager/TagActionsPanel';

interface IInspectedNodeLabelProps {}

const InspectedNodeLabel = (props: IInspectedNodeLabelProps) => {
  const {
    nodeApi: { nodeState, changeName, changeText },
  } = useContext(EachTagManagerProviderContext);

  return (
    <div style={{ fontSize: labelFontSize + 1 }} data-name={'InspectedNodeLabel'}>
      {!nodeState.isText && (
        <div className="flex">
          <div data-name={'Name '} className="flex fz-18"  >
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
          <TagActionsPanel/>
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

      {/* Hidden */}
      <FocuserInput key={nodeState.id} />
    </div>
  );
};

export default InspectedNodeLabel;
