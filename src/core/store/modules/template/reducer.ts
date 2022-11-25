import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { Node } from 'src/core/Node';
import {
  addChildToNodeAction ,
  resetHoveredNodeAction , resetStateAction ,
  updateHoveredNodeAction ,
  updateInspectedNodeAction ,
  updateNodeAction ,
  updateVariablesAction ,
} from 'src/core/store/modules/template/actions';
import { ExtendedNode } from 'src/core/ExtendedNode';
import { setWith } from 'lodash';

export type IVariables = {
  [key: string]: string;
};

export type GlobalState = {
  template: Node;
  variables: IVariables;
};

export enum StorageMap {
  State = 'state',
}
export type Uuid = ReturnType<typeof uuid>;

interface Reducer {
  nodesMap: Record<Uuid, ExtendedNode>;
  currentState: GlobalState;
  hoveredNode?: Uuid;
  inspectedNode?: Uuid;
}

const initialGlobalState: GlobalState = {
  variables: {},
  template: new Node({
    children: [
      new Node({
        children: [
          new Node({
            tag: 'span',
            isText: true,
            text: 'tratatat',
          }),
        ],
      }),
    ],
  }),
};

const destructTree = (state: GlobalState) => {
  const nodesMap: Reducer['nodesMap'] = {};

  const observer = (node: Node, deepIndex: number, levelIndex: number, xPath: string, parentNode?: Node) => {
    const extendedNode: ExtendedNode = ({
      ...node,
      xPath,
      childIndex: levelIndex,
      deepIndex,
      parentId: parentNode?.id,
      children: node.children.map((childNode, index) =>
        observer(childNode, deepIndex + 1, index, `${xPath}.children[${index}]`, node)
      ),
    });

    nodesMap[extendedNode.id] = extendedNode;

    return extendedNode;
  };

  const recursivelyObserveChildren = (startingNode: Node) => {
    return observer(startingNode, 0, 0, 'template');
  };

  const updatedTemplate = recursivelyObserveChildren(state.template);

  return { nodesMap, currentState: { ...state, template: updatedTemplate } };
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
      // if(state.hoveredNode !== action.payload) {
        state.hoveredNode = action.payload;
      // }
    })
    .addCase(resetStateAction, state => {
      return initialState(initialGlobalState)
    })
    .addCase(resetHoveredNodeAction, (state) => {
      state.hoveredNode = undefined;
    })
    .addCase(updateInspectedNodeAction, (state, action) => {
      state.inspectedNode = action.payload;
    })
    .addCase(updateNodeAction, (state, { payload: { id, field, value } }) => {
      (state.nodesMap[id] as any)[field] = value;
      updateNodeInTree(state, id);
    })
    .addCase(addChildToNodeAction, (state, action) => {
      // const newNode = action.payload.creator()
      // @todo check is it working
      // state.nodesMap[action.payload.id].children.push(newNode as NodeIntern)
      // const updatedTree =
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
