import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import clsx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNodeSelector,
  hoveredNodeSelector,
  inspectedNodeSelector,
  scrollIntoViewNodeSelector,
} from 'src/core/store/modules/template/selector';
import { Uuid } from 'src/core/store/modules/template/reducer';
import {
  resetHoveredNodeAction,
  scrollIntoViewAction,
  updateHoveredNodeAction,
  updateInspectedNodeAction,
} from 'src/core/store/modules/template/actions';
import { TagNode } from 'src/core/TagNode';
import EachTagManagerProvider from 'src/core/TagManager/EachTagManagerProvider';
import { tagsWithNoChildren } from 'src/core/TagManager/config';
import LiveTagManager from 'src/core/LiveTagManager';
import Tooltip from 'rc-tooltip';
import { alignAttrs, alignStyles } from 'src/utils/createComponentFiles';
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
  const scrollIntoViewNodeId = useSelector(scrollIntoViewNodeSelector);
  const isHovered = hoveredNodeId === nodeId || inspectedNodeId === nodeId;
  const isThisInspectingNode = inspectedNodeId === nodeId;
  const canTagHaveChildren = (tag: TagNode['tag']) => !tagsWithNoChildren.includes(tag);
  const dispatch = useDispatch();
  const nodeSelector = useCallback(createNodeSelector(nodeId), [nodeId]);
  const nodeState = useSelector(nodeSelector);
  const { className } = nodeState;

  const updateInspectedNode = (nodeId?: Uuid) => dispatch(updateInspectedNodeAction(nodeId));
  const updateHoveredNode = (nodeId: Uuid) => dispatch(updateHoveredNodeAction(nodeId));
  const resetHoveredNode = () => dispatch(resetHoveredNodeAction());
  const shouldDisplayToolbar = isHovered || isThisInspectingNode;

  const ref = useRef<HTMLDivElement | null>(null);

  const recursiveRenderChildren = () => (
    <>
      {!nodeState.isText ? (
        <>
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
    ref,
    'data-name': nodeState.name || '',
    'data-deep-level': deepLevel + 1,
    'data-index-in-level': indexInLevel,
    'data-id': nodeState.id,
    title: nodeState.name || '',
    className: clsx(
      Object.values(className).join(' '),
      isHovered && '_tag_hover',
      shouldDisplayToolbar && 'relative'
      // (className.b || className.t || className.r || className.l || isThisInspectingNode) && 'relative'
      // nodeState.className.position
      // @todo fix
      // isHovered && nodeState.className.pb && `decor-before-${nodeState.className.pb.slice(1)}`,
      // isHovered && nodeState.className.pt && `decor-before-${nodeState.className.pt.slice(1)}`,
      // isHovered && nodeState.className.pl && `decor-before-${nodeState.className.pl.slice(1)}`,
      // isHovered && nodeState.className.pr && `decor-before-${nodeState.className.pr.slice(1)}`,
    ),
    ...alignAttrs(nodeState.attrs, 'dev'),
    style: alignStyles(nodeState.style || {}, 'dev'),
    onMouseOut: (event: any) => {
      event.stopPropagation();
      resetHoveredNode();
    },
    onMouseOver: (event: any) => {
      event.stopPropagation();
      if (nodeState.isText && nodeState.parentId) {
        updateHoveredNode(nodeState.parentId);
      } else {
        updateHoveredNode(nodeState.id);
      }
    },
    onClick: (event: any) => {
      event.preventDefault();

      if (!nodeState.isText) {
        event.stopPropagation();

        if (inspectedNodeId !== nodeState.id) {
          updateInspectedNode(nodeState.id);
        } else {
          updateInspectedNode(undefined);
        }
      }
    },
    onChange: undefined as never as () => void,
  };

  // disable warning
  if (nodeState.tag === 'input') {
    attrs.onChange = () => {};
  }

  useEffect(() => {
    if (scrollIntoViewNodeId === nodeId && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      dispatch(scrollIntoViewAction(undefined));
    }
  }, [scrollIntoViewNodeId]);

  return (
    <Tooltip
      placement={'top'}
      visible={shouldDisplayToolbar}
      overlay={() => (
        <EachTagManagerProvider nodeId={nodeState.id}>
          {ref.current ? <LiveTagManager domInterface={ref.current} /> : <></>}
        </EachTagManagerProvider>
      )}
    >
      {hyperscript(nodeState.tag, attrs, canTagHaveChildren(nodeState.tag) ? recursiveRenderChildren() : undefined)}
    </Tooltip>
  );
}

export default Tag;
