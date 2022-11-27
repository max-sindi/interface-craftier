import rootReducer, { RootReducer } from './rootReducer';
import middlewares from './middlewares';
import { configureStore, MiddlewareAPI } from '@reduxjs/toolkit';
import { StorageMap } from 'src/core/store/modules/template/reducer';
import { resetStateAction , updateNodeAction , updateVariablesAction } from 'src/core/store/modules/template/actions';

function makeStore(preloadedState?: RootReducer) {
  return configureStore({
    reducer: rootReducer,
    middleware: [
      ...middlewares,
      (api: MiddlewareAPI) => (next: any) => (action: { type: string }) => {
        next(action);
        if ([updateNodeAction.toString(), resetStateAction.toString(), updateVariablesAction.toString()].includes(action.type)) {
          localStorage.setItem(StorageMap.State, JSON.stringify(api.getState().template.currentState));
        }
      },
    ],
    devTools: true,
    preloadedState,
  });

  // run sagas
  // sagas.forEach(sagaMiddleware.run);

  // return store;
}

export default makeStore;
