import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { inspectedNodeDeepnessSelector, templateSelector } from 'src/core/store/modules/template/selector';
import RecursivelyRenderTagLabels from 'src/core/TagManager/RecursivelyRenderTagLabels';
import EachTagManagerProvider  from 'src/core/TagManager/EachTagManagerProvider';
import { labelHeight } from 'src/utils';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface ITreeNavigationProps {}

const TreeNavigation = (props: ITreeNavigationProps) => {
  const template = useSelector(templateSelector);
  const inspectedNodeDeepness = useSelector(inspectedNodeDeepnessSelector);

  return (
    <div data-name={'tree-navigation'} className={'h-340 overflow-auto flex flex-column'}>
      <div
        className={'tags-container'}
        style={{
          transform:
            inspectedNodeDeepness < 17 ? 'none' : `translateY(calc(170px - ${labelHeight * inspectedNodeDeepness}px))`,
        }}
      >
        <DndProvider backend={HTML5Backend}>
          <EachTagManagerProvider nodeId={template.id}>
            <RecursivelyRenderTagLabels children={[template]} />
          </EachTagManagerProvider>
        </DndProvider>
      </div>
    </div>
  );
};

export default TreeNavigation;
