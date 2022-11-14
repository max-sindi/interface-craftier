import React , { ReactNode , useState } from 'react';
import { AiFillEdit } from 'react-icons/ai'

const EditableField = ({ notEditElement, editElement }: { notEditElement: ReactNode, editElement: ReactNode }) => {
  const [editMode, setEditMode] = useState(false)
  const onEnableEditMode = () => setEditMode(true)
  const onDisableEditNode = () => setEditMode(false)

  return (
    <div>
      {editMode && <div className={'absolute-center'} style={{ background: '#33333330', zIndex: 0 }} onClick={onDisableEditNode}/>}
      <div className={'relative'} onClick={onEnableEditMode}>
        {editMode ? editElement : <div className={'flex align-flex-end pointer'}><AiFillEdit size={13}/>{ notEditElement }</div>}
      </div>
    </div>
  );
};

export default EditableField;