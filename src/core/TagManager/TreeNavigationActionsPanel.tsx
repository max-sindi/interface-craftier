import React from 'react';
import { MdCompress , MdExpand } from 'react-icons/md';
import IconButton from 'src/core/TagManager/IconButton';
import { useDispatch } from 'react-redux';
import { collapseAllAction , expandAllAction } from 'src/core/store/modules/template/actions';

interface ITreeNavigationActionsPanelProps {
}

const TreeNavigationActionsPanel = ( props : ITreeNavigationActionsPanelProps ) => {
  const dispatch = useDispatch()
  const onExpandAll = () => dispatch(expandAllAction())
  const onCollapseAll = () => dispatch(collapseAllAction())

  return (
    <div className={'d-flex pb-10'}>
      <IconButton centering onClick={onExpandAll} title={'Expand all'}>
        <MdExpand size={20}></MdExpand>
      </IconButton>
      <IconButton centering onClick={onCollapseAll} title={'Collapse all'}>
        <MdCompress size={20}></MdCompress>
      </IconButton>
    </div>
  );
};

export default TreeNavigationActionsPanel;