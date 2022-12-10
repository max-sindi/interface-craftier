import React , { useContext } from 'react';
import { useSelector } from 'react-redux';
import { inspectedNodeDeepnessSelector , templateSelector } from 'src/core/store/modules/template/selector';
import RecursivelyRenderTagLabels from 'src/core/TagManager/RecursivelyRenderTagLabels';
import { ExtendedNode } from 'src/core/ExtendedNode';
import EachTagManagerProvider , { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { labelHeight } from 'src/utils';

interface ITreeNavigationProps {}

const TreeNavigation = (props: ITreeNavigationProps) => {
  const template = useSelector(templateSelector);
  const inspectedNodeDeepness = useSelector(inspectedNodeDeepnessSelector)
  const {
    nodeApi: { nodeState },
  } = useContext(EachTagManagerProviderContext);

  return (
    <div data-name={'tree-navigation'} className={'h-300 overflow-auto flex flex-column'}>
      <div
        className={'tags-container'}
        style={{
          transform:
            inspectedNodeDeepness < 7 ? 'none' : `translateY(calc(170px - ${labelHeight * inspectedNodeDeepness}px))`,
        }}
      >
        <EachTagManagerProvider nodeId={template.id}>
          <RecursivelyRenderTagLabels children={[template]} />
        </EachTagManagerProvider>
      </div>
    </div>
  );
};

export default TreeNavigation;