import { createAction } from '@reduxjs/toolkit';
import { cleanupTree, GlobalState, IVariables, Uuid } from './reducer';
import { TagNode } from 'src/core/TagNode';
import { ExtendedNode } from 'src/core/ExtendedNode';

const setInitialStateAction = createAction<GlobalState>('setInitialStateAction');
export const updateFilesAction = createAction<any>('updateFilesAction');
export const deleteFileAction = createAction<string>('deleteFileAction');
const updateVariablesAction = createAction<IVariables>('updateVariable');
const updateHoveredNodeAction = createAction<Uuid>('updateHoveredNode');
const resetHoveredNodeAction = createAction('resetHoveredNode');
const highlightInspectedNodeAction = createAction('highlightInspectedNodeAction');
const updateInspectedNodeAction = createAction<Uuid | undefined>('updateInspectedNodeAction');
const scrollIntoViewAction = createAction<Uuid | undefined>('scrollIntoViewAction');
const updateNodeAction = createAction<{ id: Uuid; field: string; value: any; withTreeDestructing?: boolean }>(
  'updateNodeAction'
);
const resetStateAction = createAction('resetStateAction');
const selectRootAction = createAction('selectRootAction');
const wrapNodeAction = createAction<Uuid>('wrapNodeAction');
const addChildAction = createAction<{ id: Uuid; child: TagNode, deepClone?: boolean }>('addChildAction');
const duplicateNodeAction = createAction<Uuid>('duplicateNodeAction');
const deleteNodeAction = createAction<Uuid>('deleteNodeAction');
const toggleChildrenCollapsedAction = createAction<Uuid>('toggleChildrenCollapsedAction');
const pasteChildrenAction = createAction<{ receivingNodeId: Uuid; givenNodeId: Uuid; indexToPaste: number }>(
  'pasteChildrenAction'
);
const nodeTreeNavigationAction = createAction<'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight'>(
  'nodeTreeNavigationAction'
);
// const pasteNodeAction = createAction<{ id: Uuid, node: ExtendedNode }>('pasteNodeAction')

const updateProjectStateAction = createAction<ReturnType<typeof cleanupTree>>('updateProjectStateAction');
const fetchProjectStateAction = createAction('fetchProjectStateAction');

// add new actions here
export const actionsToSave = [pasteChildrenAction, deleteNodeAction, addChildAction];
const expandAllAction = createAction('expandAllAction');
const collapseAllAction = createAction('collapseAllAction');

export {
  // pasteNodeAction,
  nodeTreeNavigationAction,
  expandAllAction,
  collapseAllAction,
  setInitialStateAction,
  updateVariablesAction,
  updateHoveredNodeAction,
  updateInspectedNodeAction,
  updateNodeAction,
  resetHoveredNodeAction,
  resetStateAction,
  selectRootAction,
  highlightInspectedNodeAction,
  toggleChildrenCollapsedAction,
  wrapNodeAction,
  duplicateNodeAction,
  pasteChildrenAction,
  deleteNodeAction,
  addChildAction,
  scrollIntoViewAction,
  updateProjectStateAction,
  fetchProjectStateAction,
};
