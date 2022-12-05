import { createSelector } from 'reselect';
import { RootReducer } from 'src/core/store/rootReducer';
import { NodesMap, Uuid } from 'src/core/store/modules/template/reducer';
import { ExtendedNode } from 'src/core/ExtendedNode';

const reducerSelector = (state: RootReducer) => state.template;

const globalStateSelector = createSelector(reducerSelector, (store) => store.currentState);
const templateSelector = createSelector(globalStateSelector, (state) => state.template);
const variablesSelector = createSelector(globalStateSelector, (state) => state.variables);
const inspectedNodeSelector = createSelector(reducerSelector, (state) => state.inspectedNode);
const hoveredNodeSelector = createSelector(reducerSelector, (state) => state.hoveredNode);
const nodesMapSelector = createSelector(reducerSelector, (state) => state.nodesMap);
const inspectedNodeStateSelector = createSelector(
  nodesMapSelector,
  inspectedNodeSelector,
  (map, inspectedNodeId): ExtendedNode | undefined => {
    return map[inspectedNodeId as Uuid];
  }
);

export const collectsNodeParents = (node: ExtendedNode, nodesMap: NodesMap) => {
  const limit = 10000; // fow now at least not Infinity
  let parents = [];
  let iteratedNode = node;

  for (let i = 0; i < limit; i++) {
    if (iteratedNode.parentId) {
      const parentNode = nodesMap[iteratedNode.parentId];
      parents.push(parentNode);
      iteratedNode = parentNode;
    }
  }

  return parents;
};

export const collectNodeChildrenRecursively = (node: ExtendedNode, nodesMap: NodesMap, ignoreClosed?: boolean) => {
  const reducer = (acc: ExtendedNode[], cur: ExtendedNode): ExtendedNode[] =>
    !ignoreClosed && cur.childrenCollapsed ? acc : [...acc, cur, ...cur.children.reduce(reducer, [])];
  return node.children.reduce(reducer, []);
};

const collectNodeSiblings = (node: ExtendedNode, nodesMap: NodesMap, countDirection: 1 | -1 = -1) => {
  const parentNode = node.parentId && nodesMap[node.parentId];
  if (parentNode) {
    const siblings = [];
    for (let i = node.childIndex + countDirection; i >= 0 && i < parentNode.children.length; i += countDirection) {
      siblings.push(parentNode.children[i]);
    }
    return siblings;
  } else {
    return [];
  }
};

export const collectNodePrependingSiblings = (node: ExtendedNode, nodesMap: NodesMap) =>
  collectNodeSiblings(node, nodesMap, -1);
export const collectNodeAppendingSiblings = (node: ExtendedNode, nodesMap: NodesMap) =>
  collectNodeSiblings(node, nodesMap, 1);
export const collectNodeAllSiblings = (node: ExtendedNode, nodesMap: NodesMap) => [
  ...collectNodeSiblings(node, nodesMap, -1),
  ...collectNodeSiblings(node, nodesMap, 1),
];

export const collectNodeSiblingsChildren = (
  node: ExtendedNode,
  nodesMap: NodesMap,
  siblingsCollector:
    | typeof collectNodePrependingSiblings
    | typeof collectNodeAppendingSiblings
    | typeof collectNodeAllSiblings
) => {
  return siblingsCollector(node, nodesMap).reduce(
    (acc, cur) => [...acc, ...collectNodeChildrenRecursively(cur, nodesMap)],
    [] as ExtendedNode[]
  );
};

export const nodeDeepnessSelector = (inspectedNodeState: ExtendedNode | undefined, nodesMap: NodesMap): number => {
  if (inspectedNodeState) {
    return (
      collectsNodeParents(inspectedNodeState, nodesMap).reduce((acc, cur) => {
        return (
          1 + acc + cur.childIndex + collectNodeSiblingsChildren(cur, nodesMap, collectNodePrependingSiblings).length
        );
      }, 0) +
      1 +
      collectNodePrependingSiblings(inspectedNodeState, nodesMap).length +
      collectNodeSiblingsChildren(inspectedNodeState, nodesMap, collectNodePrependingSiblings).length
    );
  } else {
    return 0;
  }
};

const inspectedNodeDeepnessSelector = createSelector(
  inspectedNodeStateSelector,
  nodesMapSelector,
  nodeDeepnessSelector
);

const createNodeSelector = (id: Uuid) => createSelector(reducerSelector, (state) => state.nodesMap[id]);

export {
  globalStateSelector,
  templateSelector,
  variablesSelector,
  inspectedNodeSelector,
  hoveredNodeSelector,
  createNodeSelector,
  nodesMapSelector,
  inspectedNodeStateSelector,
  inspectedNodeDeepnessSelector,
};
