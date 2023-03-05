import { Uuid } from 'src/core/store/modules/template/reducer';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useMemo } from 'react';
import {
  createNodeSelector,
  nodeDeepnessSelector,
  nodesMapSelector,
} from 'src/core/store/modules/template/selector';
import { TagNode } from 'src/core/TagNode';
import {
  addChildAction,
  deleteNodeAction,
  duplicateNodeAction,
  highlightInspectedNodeAction,
  pasteChildrenAction,
  updateHoveredNodeAction,
  updateInspectedNodeAction,
  updateNodeAction,
  wrapNodeAction,
} from 'src/core/store/modules/template/actions';
import { tags } from 'src/core/TagManager/config';
import { createSelector } from 'reselect';
import { ExtendedNode } from "src/core/ExtendedNode";

export const useTagApi = (nodeId: Uuid) => {
  const dispatch = useDispatch();
  const nodeSelector = useCallback(createNodeSelector(nodeId), [nodeId]);
  const nodeState = useSelector(nodeSelector);
  const parentNodeSelector = useMemo(
    () => (nodeState?.parentId ? createNodeSelector(nodeState.parentId) : () => undefined),
    [nodeState?.parentId]
  );
  const deepnessSelector = useCallback(createSelector(nodeSelector, nodesMapSelector, nodeDeepnessSelector), [
    nodeSelector,
  ]);
  const deepness = useSelector(deepnessSelector);

  const parentNodeState = useSelector(parentNodeSelector);
  // const parentNodeApi = useTagApi(parentNodeState.id)
  const inspectThisNode = () => dispatch(updateInspectedNodeAction(nodeId));
  const updateInspectedNode = (node?: TagNode) => dispatch(updateInspectedNodeAction(node?.id));
  const updateHoveredNode = (node: TagNode) => dispatch(updateHoveredNodeAction(node.id));
  const unselectCurrentNode = () => dispatch(updateInspectedNodeAction(undefined));
  const highlightThisNode = (event: any) => {
    event.stopPropagation();
    updateHoveredNode(nodeState);
  };
  const transformField = (field: keyof TagNode, value: any, withTreeDestructing?: boolean) =>
    dispatch(updateNodeAction({ id: nodeId, field, value, withTreeDestructing }));
  // const transformParentField = (field: keyof Node, value: any, withTreeDestructing?: boolean) =>
  //   parentNodeState && dispatch(updateNodeAction({ id: parentNodeState.id, field, value, withTreeDestructing }));
  const selectParent = () => updateInspectedNode(parentNodeState);
  const selectChild = (child: TagNode) => updateInspectedNode(child);
  const onHighlight = (hoveringNode = nodeState) => updateHoveredNode(hoveringNode);
  const createHtmlChangeHandler = (path: keyof TagNode) => (evt: any) => transformField(path, evt.target.value);
  function createChangeHandler<Value>(path: keyof TagNode) {
    return (value: Value) => {
      value instanceof Function ? transformField(path, value(nodeState[path])) : transformField(path, value);
    };
  }
  const changeClassNames = createChangeHandler<ExtendedNode['className']>('className');
  const changeStyles = createChangeHandler<ExtendedNode['style']>('style');
  const changeName = createHtmlChangeHandler('name');
  const changeText = createHtmlChangeHandler('text');
  const changeTag = createHtmlChangeHandler('tag');
  const deleteChild = (indexToDelete: number) =>
    transformField(
      'children',
      nodeState.children.filter((item, index) => index !== indexToDelete),
      true
    );

  const createNode = (children?: TagNode['children']): TagNode =>
    new TagNode({
      children,
    });

  const onMouseEnter = (event: any) => {
    event.stopPropagation();
    updateHoveredNode(nodeState);
  };

  const rendererTagSelect = () => (
    <select value={nodeState.tag} onChange={changeTag}>
      {tags.map((tag) => (
        <option value={tag} label={tag} key={tag} />
      ))}
    </select>
  );

  const addChild = (creator = createNode) => dispatch(addChildAction({ id: nodeId, child: creator() }));
  const addBlockNode = () => addChild();
  const addTextNode = () => addChild(() => new TagNode({ isText: true }));
  const wrapNode = () => dispatch(wrapNodeAction(nodeId));
  const duplicateNode = () => dispatch(duplicateNodeAction(nodeId));
  const pasteChildren = (params: Omit<Parameters<typeof pasteChildrenAction>[0], 'receivingNodeId'>) => {
    dispatch(pasteChildrenAction({ ...params, receivingNodeId: nodeId }));
    dispatch(deleteNodeAction(params.givenNodeId));
  };
  const deleteThisNode = () => dispatch(deleteNodeAction(nodeId));
  const eraseStyling = () => {
    changeStyles({})
    changeClassNames({})
  }

  return {
    eraseStyling,
    deleteThisNode,
    onMouseEnter,
    nodeState,
    parentNodeState,
    updateInspectedNode,
    updateHoveredNode,
    unselectCurrentNode,
    transformField,
    selectParent,
    selectChild,
    onHighlight,
    createHtmlChangeHandler,
    createChangeHandler,
    deleteChild,
    changeText,
    changeClassNames,
    changeStyles,
    addChild,
    addBlockNode,
    addTextNode,
    createNode,
    changeName,
    changeTag,
    rendererTagSelect,
    inspectThisNode,
    highlightThisNode,
    highlightInspectedNodeAction,
    deepness,
    wrapNode,
    duplicateNode,
    pasteChildren,
  };
};

export type NodeApi = ReturnType<typeof useTagApi>;
