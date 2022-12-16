import { createAction } from '@reduxjs/toolkit';
import { IVariables, Uuid } from './reducer';

const updateVariablesAction = createAction<IVariables>('updateVariable');
const updateHoveredNodeAction = createAction<Uuid>('updateHoveredNode');
const resetHoveredNodeAction = createAction('resetHoveredNode');
const highlightInspectedNodeAction = createAction('highlightInspectedNodeAction');
const updateInspectedNodeAction = createAction<Uuid | undefined>('updateInspectedNode');
const updateNodeAction = createAction<{ id: Uuid, field: string, value: any, withTreeDestructing?: boolean }>(
  'updateNodeAction'
);
const resetStateAction = createAction('resetStateAction')
const selectRootAction = createAction('selectRootAction')
const wrapNodeAction = createAction<Uuid>('wrapNodeAction')
const duplicateNodeAction = createAction<Uuid>('duplicateNodeAction')
const deleteNodeAction = createAction<Uuid>('deleteNodeAction')
const toggleChildrenCollapsedAction = createAction<Uuid>('toggleChildrenCollapsedAction')
const pasteChildrenAction = createAction<{ receivingNodeId: Uuid, givenNodeId: Uuid, indexToPaste: number }>('pasteChildrenAction')

// add new actions here
export const actionsToSave = [pasteChildrenAction, deleteNodeAction]

export {
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
};
