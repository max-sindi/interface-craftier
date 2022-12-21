import React  from 'react';
import { useSelector } from 'react-redux';
import { templateSelector } from 'src/core/store/modules/template/selector';
import RecursivelyRenderTagLabels from 'src/core/TagManager/RecursivelyRenderTagLabels';
import EachTagManagerProvider  from 'src/core/TagManager/EachTagManagerProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const TreeNavigation = () => {
  const template = useSelector(templateSelector);
  // const inspectedNodeDeepness = useSelector(inspectedNodeDeepnessSelector);

  return (
    <>
      {/*<div*/}
      {/*  className={'tags-container overflow-auto'}*/}
      {/*>*/}
        <DndProvider backend={HTML5Backend}>
          <EachTagManagerProvider nodeId={template.id}>
            <RecursivelyRenderTagLabels children={[template]} />
          </EachTagManagerProvider>
        </DndProvider>
      {/*</div>*/}
      </>
  );
};

export default TreeNavigation;
