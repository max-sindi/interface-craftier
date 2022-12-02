import { Uuid } from 'src/core/store/modules/template/reducer';
import { useDispatch , useSelector } from 'react-redux';
import React , { useCallback , useMemo } from 'react';
import { createNodeSelector } from 'src/core/store/modules/template/selector';
import { Node } from 'src/core/Node';
import {
  highlightInspectedNodeAction ,
  updateHoveredNodeAction ,
  updateInspectedNodeAction ,
  updateNodeAction
} from 'src/core/store/modules/template/actions';
import { tags } from 'src/core/TagManager/config';

export const useTagApi = (nodeId: Uuid) => {
  const dispatch = useDispatch();
  const nodeSelector = useCallback(createNodeSelector(nodeId), [nodeId]);
  const nodeState = useSelector(nodeSelector);
  const parentNodeSelector = useMemo(
    () => (nodeState?.parentId ? createNodeSelector(nodeState.parentId) : () => undefined),
    [nodeState?.parentId]
  );
  const parentNodeState = useSelector(parentNodeSelector);
  // const parentNodeApi = useTagApi(parentNodeState.id)
  const inspectThisNode = () => dispatch(updateInspectedNodeAction(nodeId))
  const updateInspectedNode = (node?: Node) => dispatch(updateInspectedNodeAction(node?.id));
  const updateHoveredNode = (node: Node) => dispatch(updateHoveredNodeAction(node.id));
  const unselectCurrentNode = () => dispatch(updateInspectedNodeAction(undefined));
  const highlightThisNode = (event: any) => {
    event.stopPropagation();
    updateHoveredNode(nodeState);
  }
  const highlightInspectedNode = () => dispatch(highlightInspectedNodeAction())
  const transformField = (field: keyof Node, value: any, withTreeDestructing?: boolean) =>
    dispatch(updateNodeAction({ id: nodeId, field, value, withTreeDestructing }));
  // const transformParentField = (field: keyof Node, value: any, withTreeDestructing?: boolean) =>
  //   parentNodeState && dispatch(updateNodeAction({ id: parentNodeState.id, field, value, withTreeDestructing }));
  const selectParent = () => updateInspectedNode(parentNodeState);
  const selectChild = (child: Node) => updateInspectedNode(child);
  const onHighlight = (hoveringNode = nodeState) => updateHoveredNode(hoveringNode);
  const createHtmlChangeHandler = (path: keyof Node) => (evt: any) => transformField(path, evt.target.value);
  const createChangeHandler = (path: keyof Node) => (value: any) => {
    value instanceof Function ? transformField(path, value(nodeState[path])) : transformField(path, value);
  };
  const changeText = createHtmlChangeHandler('text');
  const changeClassNamesList = createChangeHandler('className');
  const changeStyles = createChangeHandler('style');
  const changeName = createHtmlChangeHandler('name');
  const changeTag = createHtmlChangeHandler('tag');
  const deleteChild = (indexToDelete: number) =>
    transformField(
      'children',
      nodeState.children.filter((item, index) => index !== indexToDelete),
      true
    );

  const addChild = (creator = createNode) => {
    transformField('children', [...nodeState.children, creator()], true);
  };

  const addBlockNode = () => addChild();
  const addTextNode = () => addChild(() => new Node({ isText: true }));

  const createNode = (children?: Node['children']): Node =>
    new Node({
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

  return {
    onMouseEnter ,
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
    changeClassNamesList,
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
  }
}

export type NodeApi = ReturnType<typeof useTagApi>