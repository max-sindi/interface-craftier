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

  const {
    nodeApi: { nodeState },
  } = useContext(EachTagManagerProviderContext);
  const inspectedNodeDeepness = useSelector(inspectedNodeDeepnessSelector)
  console.log(inspectedNodeDeepness);
  // const parents = (() => {
  //   const limit = 5
  //   const parents = []
  //   let node = nodeState;
  //
  //   for (let i = 0; i < limit; i++) {
  //     if(node.parentId) {
  //       parents.push(node.parentId)
  //       node = nodesMap[node.parentId]
  //     }
  //   }
  //
  //   return parents
  // })()

  // const node
  // console.log(nodeState.deepIndex);
  return (
    <div data-name={'tree-navigation'} className={'h-300 overflow-auto flex flex-column'}>
      <div
        className={'tags-container'}
        style={{
          transform:
            inspectedNodeDeepness < 7 ? 'none' : `translateY(calc(170px - ${labelHeight * inspectedNodeDeepness}px))`,
        }}
      >
        <RecursivelyRenderTagLabels children={[template]} />
      </div>
    </div>
  );
};

export default TreeNavigation;