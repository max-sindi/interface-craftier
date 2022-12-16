import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ProjectContext } from 'src/core/Project';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { ExtendedNode } from 'src/core/ExtendedNode';

interface IChildDropZoneProps {}

const ChildDropZone = (props: IChildDropZoneProps) => {
  const {
    nodeApi: {
      nodeState,
      nodeState: { id, parentId },
      pasteChildren,
    },
    parentNodeApi,
  } = useContext(EachTagManagerProviderContext);
  const { nodeDragging, nodeHoveredDragging, setNodeHoveredDragging } = useContext(ProjectContext);
  const isDragging = nodeDragging === id;
  const isHovered = nodeHoveredDragging === id;

  const [dropBeforeParams, dropBeforeRef] = useDrop(
    () => ({
      accept: 'TagNode',
      collect: (monitor) => ({
        hover: monitor.isOver(),
      }),
      drop: (item, item2) => {
        const droppedNode = item as ExtendedNode;
        parentNodeApi?.pasteChildren({ givenNodeId: droppedNode.id, indexToPaste: nodeState.childIndex });
      },
    }),
    [nodeState.childIndex]
  );

  const [dropAfterParams, dropAfterRef] = useDrop(
    () => ({
      accept: 'TagNode',
      collect: (monitor) => ({
        hover: monitor.isOver(),
      }),
      drop: (item, item2) => {
        const droppedNode = item as ExtendedNode;
        parentNodeApi?.pasteChildren({ givenNodeId: droppedNode.id, indexToPaste: nodeState.childIndex + 1 });
      },
    }),
    [nodeState.childIndex]
  );

  const [dropOnParams, dropOnRef] = useDrop(
    () => ({
      accept: 'TagNode',
      collect: (monitor) => ({
        hover: monitor.isOver(),
      }),
      drop: (item, item2) => {
        const droppedNode = item as ExtendedNode;
        pasteChildren({ givenNodeId: droppedNode.id, indexToPaste: nodeState.children.length });
      },
    }),
    [nodeState.childIndex]
  );

  const [, dropHoverRef] = useDrop(
    () => ({
      accept: 'TagNode',
      hover: () => {
        setNodeHoveredDragging(id);
      },
    }),
    []
  );
  return (
    <>
      {nodeDragging && !isHovered && !isDragging && (
        <div data-name={'Drag hover handing'} className="absolute-center" ref={dropHoverRef} />
      )}
      {nodeDragging && isHovered && (
        <div data-name={'Drop handlers container'} className={'absolute-center'} style={{ opacity: 0.6 }}>
          {parentId && (
            <div
              data-name={'Drop before handler'}
              ref={dropBeforeRef}
              style={{ background: dropBeforeParams.hover ? 'violet' : 'yellow', height: '33%' }}
              className={`absolute t-0 l-0 r-0`}
            />
          )}
          {!nodeState.isText && (
            <div
              data-name={'Drop on handler'}
              ref={dropOnRef}
              style={{ background: dropOnParams.hover ? 'red' : 'yellow', height: '33%', top: '33%' }}
              className={`absolute l-0 r-0`}
            />
          )}
          {parentId && (
            <div
              data-name={'Drop after handler'}
              ref={dropAfterRef}
              style={{ background: dropAfterParams.hover ? 'blue' : 'yellow', height: '33%', top: '66%' }}
              className={`absolute l-0 r-0`}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ChildDropZone;
