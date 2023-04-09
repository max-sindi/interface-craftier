import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { TagNode } from 'src/core/TagNode';
import {
  addChildAction ,
  collapseAllAction ,
  deleteNodeAction ,
  duplicateNodeAction ,
  expandAllAction ,
  highlightInspectedNodeAction , nodeTreeNavigationAction ,
  pasteChildrenAction ,
  resetHoveredNodeAction ,
  resetStateAction ,
  scrollIntoViewAction ,
  selectRootAction ,
  setInitialStateAction ,
  toggleChildrenCollapsedAction ,
  updateHoveredNodeAction ,
  updateInspectedNodeAction ,
  updateNodeAction ,
  updateVariablesAction ,
  wrapNodeAction
} from 'src/core/store/modules/template/actions';
import { ExtendedNode } from 'src/core/ExtendedNode';
import { setWith } from 'lodash';
import { cloneNode, destructTree } from 'src/utils';
import { collectNodeAllSiblings, collectNodeChildrenRecursively } from 'src/core/store/modules/template/selector';

export type IVariables = {
  [key: string]: string;
};

export type GlobalState = {
  template: ExtendedNode;
  variables: IVariables;
  files: string[];
};

export enum StorageMap {
  // State = 'state.Shopka',
  State = 'state.thebox',
  // State = 'state.hrsLanguages',
  InspectedNode = 'inspectedNode',
}

export type Uuid = ReturnType<typeof uuid>;
export type NodesMap = Record<Uuid, ExtendedNode>;

interface Reducer {
  nodesMap: NodesMap;
  currentState: GlobalState;
  hoveredNode?: Uuid;
  inspectedNode?: Uuid;
  scrollIntoViewNode?: Uuid;
}

const initialGlobalState: GlobalState = {
  variables: {},
  files: [],
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
    ...destructTree(currentState, {}),
    hoveredNode: undefined,
    inspectedNode: localStorage.getItem(StorageMap.InspectedNode) || undefined,
  };
};

// @tip for updating node use state.nodesMap then use updateNodeInTree()
export default createReducer(initialState(), (builder) => {
  builder
    .addCase(setInitialStateAction, (state, action) => {
      return initialState(action.payload);
    })
    .addCase(updateVariablesAction, (state, action) => {
      state.currentState.variables = action.payload;
    })
    .addCase(updateHoveredNodeAction, (state, action) => {
      state.hoveredNode = action.payload;
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
    .addCase(updateInspectedNodeAction, (state, { payload: id }) => {
      state.inspectedNode = id;

      if(id) {
        expandNode(state, state.nodesMap[id])
      }
    })
    .addCase(scrollIntoViewAction, (state, action) => {
      state.scrollIntoViewNode = action.payload;
    })
    .addCase(deleteNodeAction, (state, action) => {
      const node = state.nodesMap[action.payload];

      if (node.parentId) {
        const parentNode = state.nodesMap[node.parentId];
        const indexToDelete = parentNode.children.findIndex((item) => item.id === node.id);

        parentNode.children = parentNode.children.filter((item, index) => index !== indexToDelete);
        updateNodeInTree(state, parentNode.id, true);
        state.inspectedNode = (
          parentNode.children[indexToDelete] ||
          parentNode.children[indexToDelete - 1] ||
          parentNode
        ).id;
      }
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

      if (nodeGiven.parentId) {
        const clone = cloneNode(nodeGiven, state.nodesMap) as ExtendedNode;
        const slotToPaste = nodeReceiving.children[indexToPaste];

        // shift all items ahead on 1 index and so give a slot for pasting node
        if (slotToPaste) {
          for (let i = nodeReceiving.children.length - 1; i >= indexToPaste; i--) {
            nodeReceiving.children[i + 1] = nodeReceiving.children[i];
          }
        }

        nodeReceiving.children[indexToPaste] = clone;
        updateNodeInTree(state, nodeReceiving.id, true);
        state.inspectedNode = clone.id;
      }
    })
    .addCase(duplicateNodeAction, (state, action) => {
      const node = state.nodesMap[action.payload];
      if (node.parentId) {
        const clone = cloneNode(node, state.nodesMap);
        const parentNode = state.nodesMap[node.parentId];
        parentNode.children = parentNode.children.reduce(
          (acc, cur) => (cur.childIndex === node.childIndex ? [...acc, cur, clone as ExtendedNode] : [...acc, cur]),
          [] as ExtendedNode[]
        );
        updateNodeInTree(state, node.parentId, true);
        state.inspectedNode = clone.id;
      }
    })
    // .addCase(pasteNodeAction, (state, { payload: { id, node: pastedNode }}) => {
    //   const node = state.nodesMap[id];
    //   node.children.push(cloneNode(new TagNode(pastedNode), state.nodesMap));
    // })
    .addCase(addChildAction, (state, { payload: { id, child, deepClone } }) => {
      const node = state.nodesMap[id];
      node.children.push((deepClone ? cloneNode(child, state.nodesMap) : child) as ExtendedNode);
      updateNodeInTree(state, node.id, true);
      state.inspectedNode = child.id;
    })
    .addCase(updateNodeAction, (state, { payload: { id, field, value, withTreeDestructing } }) => {
      (state.nodesMap[id] as any)[field] = value;
      updateNodeInTree(state, id, withTreeDestructing);
    })
    .addCase(toggleChildrenCollapsedAction, (state, { payload: id }) => {
      const node = state.nodesMap[id]

      if(node.childrenCollapsed) {
        expandNode(state, node)
      } else {
        collapseNode(state, node)
      }

    })
    .addCase(expandAllAction, (state) => {
      collectNodeChildrenRecursively(state.currentState.template, true).forEach((node) => {
        state.nodesMap[node.id].childrenCollapsed = false;
        updateNodeInTree(state, node.id, false)
      });
    })
    .addCase(collapseAllAction, (state) => {
      collectNodeChildrenRecursively(state.currentState.template, true).forEach((node) => {
        state.nodesMap[node.id].childrenCollapsed = true
        updateNodeInTree(state, node.id, false)
      });
    })
    .addCase(nodeTreeNavigationAction, (state, action) => {
      if(!state.inspectedNode) {
        state.inspectedNode = state.currentState.template.id
      } else {
        const inspectedNodeId = state.inspectedNode
        const inspectedNode = state.nodesMap[inspectedNodeId]
        const { children, childIndex } = inspectedNode
        const parentNode = inspectedNode.parentId && state.nodesMap[inspectedNode.parentId]

        if(action.payload === 'ArrowUp') {
          if(parentNode) {
            if(childIndex > 0) {
              state.inspectedNode = parentNode.children[childIndex - 1].id
            } else {
              state.inspectedNode = parentNode.id
            }
          }
        } else if(action.payload === 'ArrowDown') {
          if(parentNode && childIndex < parentNode.children.length - 1) {
            state.inspectedNode = parentNode.children[childIndex + 1].id
          } else {
            if(children.length) {
              state.inspectedNode = children[0].id
            }
          }
        } else if(action.payload === 'ArrowRight') {
          if(children.length) {
            state.inspectedNode = children[0].id
          }
        } else if(action.payload === 'ArrowLeft') {
          if(parentNode) {
            state.inspectedNode = parentNode.id
          }
        }
      }

    })
});

const expandNode = (state: Reducer, node: ExtendedNode) => {
  for(let i = node.id; i !== undefined;) {
    const iNode = state.nodesMap[i]

    if(iNode.childrenCollapsed) {
      state.nodesMap[i].childrenCollapsed = false
      updateNodeInTree(state, i, false);
    }

    i = iNode.parentId as string
  }

}

const collapseNode = (state: Reducer, node: ExtendedNode) => {
  state.nodesMap[node.id].childrenCollapsed = true
  updateNodeInTree(state, node.id, false);
}

function updateNodeInTree(state: Reducer, id: Uuid, withTreeDestructing?: boolean, nodeState?: ExtendedNode) {
  const updatedNode = nodeState || state.nodesMap[id];
  setWith(state.currentState, updatedNode.xPath, updatedNode);

  //  @todo performance
  // if (withTreeDestructing) {
  const destructed = destructTree(state.currentState, state.nodesMap);
  state.nodesMap = destructed.nodesMap;
  state.currentState = destructed.currentState;
  // }
}

function readStorageState() {
  const currentStateFromStorage = null;
  // const currentStateFromStorage = localStorage.getItem(StorageMap.State);
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
