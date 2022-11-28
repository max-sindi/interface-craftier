import React, { useCallback } from 'react';
import clsx from 'classnames';
import { Node } from './Node';
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
import LiveTagManager from 'src/core/LiveTagManager';
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
  const canTagHaveChildren = (tag: Node['tag']) => !['input', 'img'].includes(tag);
  const dispatch = useDispatch();
  const nodeSelector = useCallback(createNodeSelector(nodeId), [nodeId]);
  const nodeState = useSelector(nodeSelector);
  const { className } = nodeState;

  const updateInspectedNode = (node: Node) => dispatch(updateInspectedNodeAction(node.id));
  const updateHoveredNode = (node: Node) => dispatch(updateHoveredNodeAction(node.id));
  const resetHoveredNode = () => dispatch(resetHoveredNodeAction());

  const recursiveRenderChildren = () =>
    !nodeState.isText
      ? nodeState.children.map((child, index) => (
          <>
            {/* @todo: make sure that Tag is not with position: static  */}
            {isThisInspectingNode && <LiveTagManager nodeState={nodeState} />}

            <Tag nodeId={child.id} deepLevel={deepLevel + 1} indexInLevel={index} />
          </>
        ))
      : nodeState.text;

  const attrs = {
    'data-name': nodeState.name || '',
    'data-deep-level': deepLevel + 1,
    'data-index-in-level': indexInLevel,
    'data-id': nodeState.id,
    title: nodeState.name || '',
    className: clsx(
      Object.values(className).join(' '),
      isHovered && '_tag_hover',
      (className.b || className.t || className.r || className.l) && 'relative'
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
      event.stopPropagation();
      updateInspectedNode(nodeState);
    },
  };

  return hyperscript(nodeState.tag, attrs, canTagHaveChildren(nodeState.tag) ? recursiveRenderChildren() : undefined);
}

export default Tag;
