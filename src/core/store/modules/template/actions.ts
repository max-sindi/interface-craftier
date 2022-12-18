import { createAction } from '@reduxjs/toolkit';
import { IVariables, Uuid } from './reducer';
import { ExtendedNode } from 'src/core/ExtendedNode';
import { TagNode } from 'src/core/TagNode';

const updateVariablesAction = createAction<IVariables>('updateVariable');
const updateHoveredNodeAction = createAction<Uuid>('updateHoveredNode');
const resetHoveredNodeAction = createAction('resetHoveredNode');
const highlightInspectedNodeAction = createAction('highlightInspectedNodeAction');
const updateInspectedNodeAction = createAction<Uuid | undefined>('updateInspectedNodeAction');
const updateNodeAction = createAction<{ id: Uuid, field: string, value: any, withTreeDestructing?: boolean }>(
  'updateNodeAction'
);
const resetStateAction = createAction('resetStateAction')
const selectRootAction = createAction('selectRootAction')
const wrapNodeAction = createAction<Uuid>('wrapNodeAction')
const addChildAction = createAction<{ id: Uuid, child: TagNode }>('addChildAction')
const duplicateNodeAction = createAction<Uuid>('duplicateNodeAction')
const deleteNodeAction = createAction<Uuid>('deleteNodeAction')
const toggleChildrenCollapsedAction = createAction<Uuid>('toggleChildrenCollapsedAction')
const pasteChildrenAction = createAction<{ receivingNodeId: Uuid, givenNodeId: Uuid, indexToPaste: number }>('pasteChildrenAction')

// add new actions here
export const actionsToSave = [pasteChildrenAction, deleteNodeAction, addChildAction]

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
  addChildAction,
};
