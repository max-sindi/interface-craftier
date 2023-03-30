import React , { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { templateSelector } from 'src/core/store/modules/template/selector';
import RecursivelyRenderTagLabels from 'src/core/TagManager/RecursivelyRenderTagLabels';
import EachTagManagerProvider from 'src/core/TagManager/EachTagManagerProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TreeNavigationActionsPanel from 'src/core/TagManager/TreeNavigationActionsPanel';
import { nodeTreeNavigationAction } from 'src/core/store/modules/template/actions';

const TreeNavigation = () => {
  const template = useSelector(templateSelector);
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('keydown', ({ key }) => {
      if(key === 'ArrowDown' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowRight') {
        dispatch(nodeTreeNavigationAction(key))
      }
    })
  }, [dispatch])

  return (
    <>
      <TreeNavigationActionsPanel/>
      <DndProvider backend={HTML5Backend}>
        <EachTagManagerProvider nodeId={template.id}>
          <RecursivelyRenderTagLabels children={[template]} />
        </EachTagManagerProvider>
      </DndProvider>
    </>
  );
};

export default TreeNavigation;
