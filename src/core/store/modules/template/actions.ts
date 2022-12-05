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
const toggleChildrenCollapsedAction = createAction<Uuid>('toggleChildrenCollapsedAction')

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
};
