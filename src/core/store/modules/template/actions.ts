import { createAction } from '@reduxjs/toolkit';
import { IVariables, Uuid } from './reducer';
import { Node } from 'src/core/Node';

const updateVariablesAction = createAction<IVariables>('updateVariable');
const updateHoveredNodeAction = createAction<Uuid>('updateHoveredNode');
const resetHoveredNodeAction = createAction('resetHoveredNode');
const updateInspectedNodeAction = createAction<Uuid | undefined>('updateInspectedNode');
const updateNodeAction = createAction<{ id: Uuid, field: string, value: any }>(
  'updateNodeAction'
);
const resetStateAction = createAction('resetStateAction')
const addChildToNodeAction = createAction<{ id: Uuid; newChild: Node }>('addChildToNodeAction');

export {
  updateVariablesAction,
  updateHoveredNodeAction,
  updateInspectedNodeAction,
  updateNodeAction,
  addChildToNodeAction,
  resetHoveredNodeAction,
  resetStateAction,
};
