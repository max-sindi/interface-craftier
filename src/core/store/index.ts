import rootReducer, { RootReducer } from './rootReducer';
import middlewares from './middlewares';
import { configureStore, MiddlewareAPI } from '@reduxjs/toolkit';
import { cleanupTree, StorageMap } from 'src/core/store/modules/template/reducer';
import {
  actionsToSave ,
  duplicateNodeAction ,
  resetStateAction , updateInspectedNodeAction ,
  updateNodeAction ,
  updateVariablesAction ,
  wrapNodeAction ,
} from 'src/core/store/modules/template/actions';

function makeStore(preloadedState?: RootReducer) {
  return configureStore({
    reducer: rootReducer,
    middleware: [
      ...middlewares,
      (api: MiddlewareAPI) => (next: any) => (action: { type: string, payload: any }) => {
        next(action);
        // save global state
        if (
          [
            updateNodeAction.toString(),
            resetStateAction.toString(),
            updateVariablesAction.toString(),
            wrapNodeAction.toString(),
            duplicateNodeAction.toString(),
            ...actionsToSave.map((action) => action.toString()),
          ].includes(action.type)
        ) {
          localStorage.setItem(StorageMap.State, JSON.stringify(cleanupTree(api.getState().template.currentState)));
        }

        // save inspected node
        if([updateInspectedNodeAction.toString()].includes(action.type) && action.payload) {
          localStorage.setItem(StorageMap.InspectedNode, action.payload)
        }
      },
    ],
    devTools: true,
    preloadedState,
  });
}

export default makeStore;
