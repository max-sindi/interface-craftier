import React, { useContext } from 'react';
import  { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { greenColor, labelFontSize, labelHeight, levelDeepPx } from 'src/utils';
import { toggleChildrenCollapsedAction } from 'src/core/store/modules/template/actions';
import { useDispatch, useSelector } from 'react-redux';
import { inspectedNodeStateSelector } from 'src/core/store/modules/template/selector';
import { AiFillCaretRight } from 'react-icons/ai';
import clsx from 'classnames';
import InspectedNodeLabel from 'src/core/TagManager/InspectedNodeLabel';
import TagLabel from 'src/core/TagManager/TagLabel';
import RecursivelyRenderTagLabels from 'src/core/TagManager/RecursivelyRenderTagLabels';
import { useDrag } from 'react-dnd';
import { ProjectContext } from 'src/core/Project';
import ChildDropZone from 'src/core/TagManager/ChildDropZone';

const ChildTagNode = () => {
  const {
    nodeApi: {
      nodeState,
      nodeState: { id },
    },
  } = useContext(EachTagManagerProviderContext);
  const inspectedNodeState = useSelector(inspectedNodeStateSelector);
  const { nodeDragging, setNodeDragging, nodeHoveredDragging, setNodeHoveredDragging } = useContext(ProjectContext);
  const dispatch = useDispatch();
  const isInspected = inspectedNodeState?.id === nodeState.id;
  const isHovered = nodeHoveredDragging === id;
  const isDragging = nodeDragging === id;
  const levelDifferenceToInspectedNode = Math.abs(
    inspectedNodeState ? -inspectedNodeState.deepIndex + nodeState.deepIndex : 0
  );
  const fontSize = labelFontSize - levelDifferenceToInspectedNode * 0.12;
  const toggleChildrenCollapsed = () => {
    dispatch(toggleChildrenCollapsedAction(id));
    // dispatch(updateInspectedNodeAction(id));
  };

  const [, dragRef] = useDrag(
    () => ({
      item: nodeState,
      type: 'TagNode',
      canDrag: () => {
        setNodeDragging(id);
        return true;
      },
      end: () => {
        setNodeDragging(undefined);
        setNodeHoveredDragging(undefined);
      },
    }),
    []
  );

  return (
    <>
      <div
        ref={dragRef}
        className={'flex align-center w-100-p'}
        data-name={'Drag ref, RecursivelyRenderTagLabels + ' + id}
        style={{ opacity: !isDragging ? 1 : 0.5}}
      >
        {!nodeState.isText && !!nodeState.children.length ? (
          <div
            data-name={'Tag collapser button'}
            className={`w-0 z-index-1`}
            style={{ position: 'relative', left: nodeState.deepIndex * levelDeepPx - 10 }}
          >
            <AiFillCaretRight
              className={'pointer p-3'}
              style={{ transform: `rotate(${nodeState.childrenCollapsed ? 0 : 45}deg)`, transition: 'all 0.4s' }}
              onClick={toggleChildrenCollapsed}
            />
          </div>
        ) : null}

        <div
          data-name={'drop ref'}
          className={clsx(['relative overflow-hidden w-100-p', isInspected && 'label'])}
          style={{
            fontSize,
            color: isInspected ? '#fff' : '#444',
            minHeight: (isInspected ? labelHeight + 10 : labelHeight) + (isHovered ? 70 : 0),
            transition: `all 0.${3 + levelDifferenceToInspectedNode}s`,
            background: isInspected ? greenColor : 'transparent',
            marginLeft: !isInspected ? 0 : nodeState.deepIndex * levelDeepPx + 10,
          }}
        >
          {isInspected ? <InspectedNodeLabel /> : <TagLabel />}
          <ChildDropZone/>
        </div>
      </div>
      {!!nodeState.children.length && !nodeState.childrenCollapsed && (
        <div className={`w-100-p`}>
          <RecursivelyRenderTagLabels children={nodeState.children} />
        </div>
      )}
    </>
  );
};

export default ChildTagNode;
