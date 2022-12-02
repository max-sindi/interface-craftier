import React, { useContext } from 'react';
import EditableField from 'src/core/TagManager/EditableField';
import IconButton from 'src/core/TagManager/IconButton';
import { IoMdAdd } from 'react-icons/io';
import { TbPlaylistAdd } from 'react-icons/tb';
import TagLabel from 'src/core/TagManager/TagLabel';
import EachTagManagerProvider, { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { useSelector } from 'react-redux';
import { nodesMapSelector, templateSelector } from 'src/core/store/modules/template/selector';
import RecursivelyRenderTagLabels from 'src/core/TagManager/RecursivelyRenderTagLabels';
import { labelFontSize, labelHeight, levelDeepPx } from 'src/utils';
import { ExtendedNode } from 'src/core/ExtendedNode';

interface ITreeNavigationProps {}

const TreeNavigation = (props: ITreeNavigationProps) => {
  const template = useSelector(templateSelector);
  const {
    nodeApi: { nodeState },
  } = useContext(EachTagManagerProviderContext);

  return (
    <div data-name={'tree-navigation'} className={'h-300 overflow-auto flex flex-column'}>
      <div
        className={'tags-container'}
        style={{
          transform:
            nodeState.deepIndex < 7 ? 'none' : `translateY(calc(170px - ${labelHeight * nodeState.deepIndex}px))`,
        }}
      >
        <RecursivelyRenderTagLabels children={template.children as ExtendedNode[]} />
      </div>
    </div>
  );
};

export default TreeNavigation;

// useEffect(() => {
// if(containerRef?.current) {
//   ;(containerRef.current as HTMLDivElement).scrollTo( {
//     left: 0 ,
//     top: labelHeight * nodeState.deepIndex,
//     behavior: 'smooth'
//   })
// }
// }, [nodeState.id, containerRef?.current]);
