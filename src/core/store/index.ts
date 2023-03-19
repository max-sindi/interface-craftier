import rootReducer, { RootReducer } from './rootReducer';
import middlewares from './middlewares';
import { configureStore, MiddlewareAPI } from '@reduxjs/toolkit';
import { cleanupTree, StorageMap } from 'src/core/store/modules/template/reducer';
import {
  actionsToSave ,
  duplicateNodeAction ,
  resetStateAction , updateInspectedNodeAction ,
  updateNodeAction , updateProjectStateAction ,
  updateVariablesAction ,
  wrapNodeAction
} from 'src/core/store/modules/template/actions';
import sagaMiddleware , { sagas } from 'src/core/store/middlewares/saga';
import { debounce } from 'lodash';

const debouncedUpdater = debounce((cb: () => void) => cb(), 500)

function makeStore(preloadedState?: RootReducer) {
  const store =  configureStore({
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
          debouncedUpdater(() => api.dispatch(updateProjectStateAction(cleanupTree(api.getState().template.currentState))))
          // localStorage.setItem(StorageMap.State, JSON.stringify(cleanupTree(api.getState().template.currentState)));
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

  sagas.forEach(sagaMiddleware.run);

  return store
}

export default makeStore;
