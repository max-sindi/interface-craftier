import createSagaMiddleware from 'redux-saga';
import saga from 'src/core/store/modules/template/saga';
const sagaMiddleware = createSagaMiddleware();

// // add new sagas here
const sagas = [saga];
export { sagas };
export default sagaMiddleware
