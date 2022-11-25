import { createSelector } from '@reduxjs/toolkit';
import { RootReducer } from 'src/core/store/rootReducer';
import { Uuid } from 'src/core/store/modules/template/reducer';

const reducerSelector = (state: RootReducer) => state.template;

const globalStateSelector = createSelector(reducerSelector, store => store.currentState)
const templateSelector = createSelector(globalStateSelector, state => state.template)
const variablesSelector = createSelector(globalStateSelector, state => state.variables)
const inspectedNodeSelector = createSelector(reducerSelector, state => state.inspectedNode)
const hoveredNodeSelector = createSelector(reducerSelector, state => state.hoveredNode)
const createNodeSelector = (id: Uuid) => createSelector(reducerSelector, state => state.nodesMap[id])

export {
  globalStateSelector,
  templateSelector,
  variablesSelector,
  inspectedNodeSelector,
  hoveredNodeSelector,
  createNodeSelector
}