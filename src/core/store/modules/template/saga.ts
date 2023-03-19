import {
  fetchProjectStateAction ,
  setInitialStateAction ,
  updateProjectStateAction
} from 'src/core/store/modules/template/actions';
import { select, takeLatest, put } from 'redux-saga/effects'
import  { AxiosResponse } from 'axios';
import { globalStateSelector } from 'src/core/store/modules/template/selector';
import { GlobalState } from 'src/core/store/modules/template/reducer';
import axios from 'src/axios';

function* updateProjectStateSaga(action: ReturnType<typeof updateProjectStateAction>) {
  yield axios.post('/wace', action.payload).then(res => {})
}

function* fetchProjectStateSaga(action: ReturnType<typeof fetchProjectStateAction>) {
  const globalState: GlobalState = yield select(globalStateSelector);

  try {
    const { data }: AxiosResponse<GlobalState> = yield axios.get('/wace')
      if(data) {
        yield put(setInitialStateAction(data))
      } else {
        yield put(updateProjectStateAction(globalState))
      }
  } catch ( e ) {
    yield put(updateProjectStateAction(globalState))
  }
}

export default function* saga() {
  yield takeLatest(updateProjectStateAction, updateProjectStateSaga);
  yield takeLatest(fetchProjectStateAction, fetchProjectStateSaga);
}
