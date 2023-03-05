import React, { Fragment, useCallback } from 'react';
import clsx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNodeSelector,
  hoveredNodeSelector,
  inspectedNodeSelector,
} from 'src/core/store/modules/template/selector';
import { Uuid } from 'src/core/store/modules/template/reducer';
import {
  resetHoveredNodeAction,
  updateHoveredNodeAction,
  updateInspectedNodeAction,
} from 'src/core/store/modules/template/actions';
import { TagNode } from 'src/core/TagNode';
import EachTagManagerProvider from 'src/core/TagManager/EachTagManagerProvider';
import { tagsWithNoChildren } from "src/core/TagManager/config";
// import Tooltip from 'rc-tooltip';
// import Toolbar from 'src/core/TagManager/Toolbar';
const hyperscript = require('react-hyperscript');

type Props = {
  deepLevel: number;
  indexInLevel: number;
  nodeId: Uuid;
  text?: string;
};

function Tag({ deepLevel, indexInLevel, nodeId }: Props) {
  const hoveredNodeId = useSelector(hoveredNodeSelector);
  const inspectedNodeId = useSelector(inspectedNodeSelector);
  const isHovered = hoveredNodeId === nodeId || inspectedNodeId === nodeId;
  const isThisInspectingNode = inspectedNodeId === nodeId;
  const canTagHaveChildren = (tag: TagNode['tag']) => !tagsWithNoChildren.includes(tag);
  const dispatch = useDispatch();
  const nodeSelector = useCallback(createNodeSelector(nodeId), [nodeId]);
  const nodeState = useSelector(nodeSelector);
  const { className } = nodeState;

  const updateInspectedNode = (node: TagNode) => dispatch(updateInspectedNodeAction(node.id));
  const updateHoveredNode = (node: TagNode) => dispatch(updateHoveredNodeAction(node.id));
  const resetHoveredNode = () => dispatch(resetHoveredNodeAction());

  const recursiveRenderChildren = () => (
    <>
      {!nodeState.isText ? (
        <>
          {isThisInspectingNode && (
            <EachTagManagerProvider nodeId={nodeState.id}>{/*<LiveTagManager />*/}</EachTagManagerProvider>
          )}
          {nodeState.children.map((child, index) => (
            <Fragment key={child.id}>
              <Tag nodeId={child.id} deepLevel={deepLevel + 1} indexInLevel={index} />
            </Fragment>
          ))}
        </>
      ) : (
        nodeState.text
      )}
    </>
  );
  const attrs = {
    'data-name': nodeState.name || '',
    'data-deep-level': deepLevel + 1,
    'data-index-in-level': indexInLevel,
    'data-id': nodeState.id,
    title: nodeState.name || '',
    className: clsx(
      Object.values(className).join(' '),
      isHovered && '_tag_hover',
      (className.b || className.t || className.r || className.l || isThisInspectingNode) && 'relative'
      // nodeState.className.position
      // @todo fix
      // isHovered && nodeState.className.pb && `decor-before-${nodeState.className.pb.slice(1)}`,
      // isHovered && nodeState.className.pt && `decor-before-${nodeState.className.pt.slice(1)}`,
      // isHovered && nodeState.className.pl && `decor-before-${nodeState.className.pl.slice(1)}`,
      // isHovered && nodeState.className.pr && `decor-before-${nodeState.className.pr.slice(1)}`,
    ),
    ...(nodeState.attrs || {}),
    style: nodeState.style || {},
    onMouseOut: (event: any) => {
      event.stopPropagation();
      resetHoveredNode();
    },
    onMouseOver: (event: any) => {
      event.stopPropagation();
      updateHoveredNode(nodeState);
    },
    onClick: (event: any) => {
      event.preventDefault();
      if (!nodeState.isText) {
        event.stopPropagation();
        updateInspectedNode(nodeState);
      }
    },
    onChange: (undefined as never as (() => void))
  };

  // disable warning
  if(nodeState.tag === 'input') {
    attrs.onChange = () => {}
  }

  // const wrapper = (children?: JSX.Element) =>
  //   !isThisInspectingNode ? (
  //     <>{children}</>
  //   ) : (
  //     <Tooltip
  //       visible={true}
  //       overlay={() => (
  //         <>
  //           <EachTagManagerProvider nodeId={nodeState.id}>
  //             <Toolbar />
  //           </EachTagManagerProvider>
  //         </>
  //       )}
  //     >
  //       {children}
  //     </Tooltip>
  //   );

  return hyperscript(nodeState.tag, attrs, canTagHaveChildren(nodeState.tag) ? recursiveRenderChildren() : undefined)
}

export default Tag;
