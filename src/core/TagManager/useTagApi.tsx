import { Uuid } from 'src/core/store/modules/template/reducer';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useMemo } from 'react';
import { createNodeSelector, nodeDeepnessSelector, nodesMapSelector } from 'src/core/store/modules/template/selector';
import { TagNode , tags } from 'src/core/TagNode';
import {
  addChildAction,
  deleteNodeAction,
  duplicateNodeAction,
  highlightInspectedNodeAction,
  pasteChildrenAction,
  scrollIntoViewAction,
  updateHoveredNodeAction,
  updateInspectedNodeAction,
  updateNodeAction,
  wrapNodeAction,
} from 'src/core/store/modules/template/actions';
import { createSelector } from 'reselect';
import { ExtendedNode } from 'src/core/ExtendedNode';
import { cloneNode } from 'src/utils';

export type StyleToCopy = Pick<ExtendedNode, 'style' | 'className'>;

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
  const scrollIntoView = () => dispatch(scrollIntoViewAction(nodeId));
  const unselectCurrentNode = () => dispatch(updateInspectedNodeAction(undefined));
  const highlightThisNode = (event: any) => {
    event.stopPropagation();
    updateHoveredNode(nodeState);
  };
  const transformField = (field: keyof ExtendedNode, value: any, withTreeDestructing?: boolean) =>
    dispatch(updateNodeAction({ id: nodeId, field, value, withTreeDestructing }));
  // const transformParentField = (field: keyof Node, value: any, withTreeDestructing?: boolean) =>
  //   parentNodeState && dispatch(updateNodeAction({ id: parentNodeState.id, field, value, withTreeDestructing }));
  const selectParent = () => updateInspectedNode(parentNodeState);
  const selectChild = (child: TagNode) => updateInspectedNode(child);
  const onHighlight = (hoveringNode = nodeState) => updateHoveredNode(hoveringNode);
  const createHtmlChangeHandler = (fieldName: keyof ExtendedNode) => (evt: any) =>
    transformField(fieldName, evt.target.value);
  function createChangeHandler<Value>(fieldName: keyof ExtendedNode) {
    return (value: Value) => {
      value instanceof Function
        ? transformField(fieldName, value(nodeState[fieldName]))
        : transformField(fieldName, value);
    };
  }
  const changeClassNames = createChangeHandler<ExtendedNode['className']>('className');
  const changeStyles = createChangeHandler<ExtendedNode['style']>('style');
  const changeName = createChangeHandler('name');
  const changeText = createChangeHandler('text');
  const changeTag = createHtmlChangeHandler('tag');
  const changeReactComponent = createChangeHandler('reactComponent');
  const toggleReactComponent = () => changeReactComponent(!nodeState.reactComponent);
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

  const addChild = (creator = createNode, deepClone?: boolean) => dispatch(addChildAction({ id: nodeId, child: creator(), deepClone }));
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
    changeStyles({});
    changeClassNames({});
  };

  const pasteStyleFromClipboard = async () => {
    const data = await navigator.clipboard.readText();

    try {
      const parsedData = JSON.parse(data) as StyleToCopy;
      changeClassNames({ ...nodeState.className, ...parsedData.className });
      changeStyles({ ...nodeState.style, ...parsedData.style });
    } catch (e) {
      console.error('Error while parse');
    }
  };

  const pasteNodeFromClipboard = async () => {
    const data = await navigator.clipboard.readText();

    try {
      addChild(() => JSON.parse(data) as ExtendedNode, true)
    } catch (e) {
      console.error('Error while parse');
    }
  };

  return {
    pasteNodeFromClipboard,
    pasteStyleFromClipboard,
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
    changeReactComponent,
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
    scrollIntoView,
    toggleReactComponent,
  };
};

export type NodeApi = ReturnType<typeof useTagApi>;
