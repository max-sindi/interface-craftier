import React , { KeyboardEventHandler , useContext } from 'react';
import { labelFontSize } from 'src/utils';
import EditableField from 'src/core/TagManager/EditableField';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import FocuserInput from 'src/core/TagManager/FocuserInput';
import TagActionsPanel from 'src/core/TagManager/TagActionsPanel';
import Input from 'src/core/UI/Input';
import treeNavigation from 'src/core/TagManager/TreeNavigation';
import { nodeTreeNavigationAction } from 'src/core/store/modules/template/actions';

const InspectedNodeLabel = () => {
  const {
    nodeApi: { nodeState, changeName, changeText },
  } = useContext(EachTagManagerProviderContext);
  const nameInitiallyEditable = !nodeState.name;

  // @ts-ignore
  const arrowsPreventPropagation: KeyboardEventHandler = (evt: KeyboardEvent) => {
    const { key } = evt
    if ( key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight' ) {
      evt.stopPropagation();
    }
  }

  return (
    <div style={{ fontSize: labelFontSize + 1 }} data-name={'InspectedNodeLabel'}>
      {/* Hidden */}
      <FocuserInput key={nodeState.id} />

      {!nodeState.isText && (
        <div className="d-flex">
            <div data-name={'Name '} className="fz-18 grow-1">
              <EditableField
                initiallyEditable={nameInitiallyEditable}
                notEditElement={nodeState.name || '-'}
                editElement={
                  <Input
                    asTextarea
                    value={nodeState.name}
                    onChange={changeName}
                    autoFocus={true} placeholder={'Name'}
                    style={{ fontSize: labelFontSize + 4, color: 'white' }}
                    className={'w-95-p edit-text-input ml-5'}
                    rows={3}
                    onKeyDown={arrowsPreventPropagation}
                  />
                }
              />
            <div className="fz-18">{`< ${nodeState.tag} />`}</div>
          </div>
          <div className="min-w-250 max-w-250">
            <TagActionsPanel />
          </div>
        </div>
      )}
      <div data-name={'children-navigation'}>
        {nodeState.isText && (
          <div className={'d-flex relative'}>
            <EditableField
              initiallyEditable={true}
              notEditElement={<span className={'node-text'}>{nodeState.text}</span>}
              editElement={
                <Input
                  asTextarea
                  onKeyDown={arrowsPreventPropagation}
                  rows={2 + nodeState.text.length / 37}
                  value={nodeState.text}
                  onChange={changeText}
                  autoFocus={true} placeholder={'Text'}
                  style={{ fontSize: labelFontSize + 1, color: 'white' }}
                  className={'edit-text-input w-80-p'}
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
