import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { TagNode } from 'src/core/TagNode';
import {
  highlightInspectedNodeAction ,
  resetHoveredNodeAction ,
  resetStateAction ,
  selectRootAction ,
  toggleChildrenCollapsedAction ,
  updateHoveredNodeAction ,
  updateInspectedNodeAction ,
  updateNodeAction ,
  updateVariablesAction ,
} from 'src/core/store/modules/template/actions';
import { ExtendedNode } from 'src/core/ExtendedNode';
import { setWith } from 'lodash';
import { destructTree } from 'src/utils';

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
export type NodesMap = Record<Uuid, ExtendedNode>

interface Reducer {
  nodesMap: NodesMap;
  currentState: GlobalState;
  hoveredNode?: Uuid;
  inspectedNode?: Uuid;
}

const initialGlobalState: GlobalState = {
  variables: {},
  template: new TagNode({
    children: [
      new TagNode({
        children: [
          new TagNode({
            tag: 'span',
            isText: true,
            text: 'tratatat',
          }),
        ],
      }),
    ],
  }) as ExtendedNode,
};

export const cleanupTree = (state: GlobalState): GlobalState => {
  const observer = (node: ExtendedNode): TagNode => {
    return new TagNode({ ...node, children: node.children.map(observer) });
  };

  return { ...state, template: observer(state.template as ExtendedNode) as ExtendedNode }; // @todo fix "as Extended" because it's a liy
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
    .addCase(toggleChildrenCollapsedAction, (state, action) => {
      state.nodesMap[action.payload].childrenCollapsed = !state.nodesMap[action.payload].childrenCollapsed
      updateNodeInTree(state, action.payload)
    })
    .addCase(selectRootAction, (state) => {
      state.inspectedNode = state.currentState.template.id;
    })
    .addCase(updateNodeAction, (state, { payload: { id, field, value, withTreeDestructing } }) => {
      (state.nodesMap[id] as any)[field] = value;
      updateNodeInTree(state, id);
      if (withTreeDestructing) {
        const destructed = destructTree(state.currentState);
        state.nodesMap = destructed.nodesMap;
        state.currentState = destructed.currentState;
      }
    });
});

function updateNodeInTree(state: Reducer, id: Uuid) {
  const updatedNode = state.nodesMap[id];
  setWith(state.currentState, updatedNode.xPath, state.nodesMap[id]);
}

function readStorageState() {
  const currentStateFromStorage = localStorage.getItem(StorageMap.State);
  let currentState = initialGlobalState;

  if (!currentStateFromStorage) {
    localStorage.setItem(StorageMap.State, JSON.stringify(currentState));
  } else {
    try {
      currentState = JSON.parse(currentStateFromStorage) as GlobalState;
    } catch (e) {
      console.error('Unable to parse template from storage ', e);
    }
  }

  return currentState;
}
