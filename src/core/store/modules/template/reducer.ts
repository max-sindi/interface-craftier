import { createReducer , current } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { TagNode } from 'src/core/TagNode';
import {
  deleteNodeAction ,
  duplicateNodeAction ,
  highlightInspectedNodeAction ,
  pasteChildrenAction ,
  resetHoveredNodeAction ,
  resetStateAction ,
  selectRootAction ,
  toggleChildrenCollapsedAction ,
  updateHoveredNodeAction ,
  updateInspectedNodeAction ,
  updateNodeAction ,
  updateVariablesAction ,
  wrapNodeAction ,
} from 'src/core/store/modules/template/actions';
import { ExtendedNode } from 'src/core/ExtendedNode';
import { setWith } from 'lodash';
import { cloneNode, destructTree } from 'src/utils';
import { Simulate } from 'react-dom/test-utils';
import loadedData = Simulate.loadedData;

export type IVariables = {
  [key: string]: string;
};

export type GlobalState = {
  template: ExtendedNode;
  variables: IVariables;
};

export enum StorageMap {
  State = 'state',
}

export type Uuid = ReturnType<typeof uuid>;
export type NodesMap = Record<Uuid, ExtendedNode>;

interface Reducer {
  nodesMap: NodesMap;
  currentState: GlobalState;
  hoveredNode?: Uuid;
  inspectedNode?: Uuid;
}

const initialGlobalState: GlobalState = {
  variables: {},
  template: new TagNode({
    name: 'Root',
    children: [
      new TagNode({
        name: 'Tratata Father',
        children: [
          new TagNode({
            tag: 'span',
            isText: true,
            name: 'tratatata',
            text: 'tratatat',
          }),
        ],
      }),
    ],
  }) as ExtendedNode,
};

export const cleanupTree = (state: GlobalState): Omit<GlobalState, 'template'> & { template: TagNode } => {
  const recursiveIterator = (node: ExtendedNode): TagNode => {
    return new TagNode({ ...node, children: node.children.map(recursiveIterator) });
  };

  return { ...state, template: recursiveIterator(state.template) };
};

const initialState = (initialGlobalState?: GlobalState): Reducer => {
  const currentState = initialGlobalState || readStorageState();

  return {
    ...destructTree(currentState),
    hoveredNode: undefined,
    inspectedNode: undefined,
  };
};

export default createReducer(initialState(), (builder) => {
  builder
    .addCase(updateVariablesAction, (state, action) => {
      state.currentState.variables = action.payload;
    })
    .addCase(updateHoveredNodeAction, (state, action) => {
      state.hoveredNode = action.payload;
      // update state to be sure in up to date
      const destructed = destructTree(state.currentState);
      state.nodesMap = destructed.nodesMap;
      state.currentState = destructed.currentState;
    })
    .addCase(resetStateAction, () => {
      return initialState(initialGlobalState);
    })
    .addCase(resetHoveredNodeAction, (state) => {
      state.hoveredNode = undefined;
    })
    .addCase(highlightInspectedNodeAction, (state) => {
      state.hoveredNode = state.inspectedNode;
    })
    .addCase(updateInspectedNodeAction, (state, action) => {
      state.inspectedNode = action.payload;
    })
    .addCase(deleteNodeAction, (state, action) => {
      const node = state.nodesMap[action.payload]
      if(node.parentId) {
        const parentNode = state.nodesMap[node.parentId]
        parentNode.children = parentNode.children.filter(item => item.id !== node.id)
        updateNodeInTree(state, parentNode.id, true)
      }
    })
    .addCase(toggleChildrenCollapsedAction, (state, action) => {
      state.nodesMap[action.payload].childrenCollapsed = !state.nodesMap[action.payload].childrenCollapsed;
      updateNodeInTree(state, action.payload, false);
    })
    .addCase(selectRootAction, (state) => {
      state.inspectedNode = state.currentState.template.id;
    })
    .addCase(wrapNodeAction, (state, action) => {
      const node = state.nodesMap[action.payload];
      const wrapperNode = new TagNode({ children: [node] });
      const parentNode = state.nodesMap[node.parentId || ''];
      if (parentNode) {
        parentNode.children[node.childIndex] = wrapperNode as ExtendedNode;
        updateNodeInTree(state, parentNode.id, true);
      }
    })
    .addCase(pasteChildrenAction, (state, { payload: { receivingNodeId, indexToPaste, givenNodeId } }) => {
      const nodeReceiving = state.nodesMap[receivingNodeId];
      const nodeGiven = state.nodesMap[givenNodeId];

      if(nodeGiven.parentId) {
        const clone = cloneNode(nodeGiven) as ExtendedNode;
        const slotToPaste = nodeReceiving.children[indexToPaste]

        // shift items ahead on 1 index and give a slot for pasted node
        if(slotToPaste) {
          for(let i = nodeReceiving.children.length - 1; i >= indexToPaste; i--) {
            nodeReceiving.children[i + 1] = nodeReceiving.children[i]
          }
        }

        nodeReceiving.children[indexToPaste] = clone
        updateNodeInTree(state, nodeReceiving.id, true)
        state.inspectedNode = clone.id
      }
    })
    .addCase(duplicateNodeAction, (state, action) => {
      const node = state.nodesMap[action.payload];
      if (node.parentId) {
        const clone = cloneNode(node);
        const parentNode = state.nodesMap[node.parentId];
        parentNode.children = parentNode.children.reduce(
          (acc, cur) => (cur.childIndex === node.childIndex ? [...acc, cur, clone as ExtendedNode] : [...acc, cur]),
          [] as ExtendedNode[]
        );
        updateNodeInTree(state, node.parentId, true);
      }
    })
    .addCase(updateNodeAction, (state, { payload: { id, field, value, withTreeDestructing } }) => {
      (state.nodesMap[id] as any)[field] = value;
      updateNodeInTree(state, id, withTreeDestructing);
    });
});

function updateNodeInTree(state: Reducer, id: Uuid, withTreeDestructing?: boolean, nodeState?: ExtendedNode) {
  const updatedNode = nodeState || state.nodesMap[id];
  setWith(state.currentState, updatedNode.xPath, updatedNode);

  if (withTreeDestructing) {
    const destructed = destructTree(state.currentState);
    state.nodesMap = destructed.nodesMap;
    state.currentState = destructed.currentState;
  }
}

function readStorageState() {
  const currentStateFromStorage = localStorage.getItem(StorageMap.State);
  let currentState = initialGlobalState;

  if (!currentStateFromStorage) {
    localStorage.setItem(StorageMap.State, JSON.stringify(currentState));
  } else {
    try {
      currentState = JSON.parse(currentStateFromStorage) as GlobalState;
      console.log(currentState);
    } catch (e) {
      console.error('Unable to parse template from storage ', e);
    }
  }

  return currentState;
}
