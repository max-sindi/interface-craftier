import { combineReducers } from 'redux';
import template from './modules/template/reducer';

// add new reducers here
const rootReducer = combineReducers({
  template
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
