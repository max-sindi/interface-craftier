import React, { ReactNode, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';

const EditableField = ({
  notEditElement,
  editElement,
  initiallyEditable,
}: {
  notEditElement: ReactNode;
  editElement: ReactNode;
  initiallyEditable?: boolean;
}) => {
  const [editMode, setEditMode] = useState(initiallyEditable);
  const onEnableEditMode = () => setEditMode(true);
  const onDisableEditNode = () => setEditMode(false);

  return (
    <div className={'w-100-p'}>
      {editMode && <div className={'absolute-center'} onClick={onDisableEditNode} />}
      <div className={'relative w-100-p'} onClick={onEnableEditMode}>
        {editMode ? (
          editElement
        ) : (
          <div className={'flex align-flex-end pointer'}>
            <AiFillEdit size={13} />
            {notEditElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableField;
