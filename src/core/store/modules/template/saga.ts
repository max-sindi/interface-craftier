import {
  deleteFileAction ,
  fetchProjectStateAction ,
  setInitialStateAction , updateFilesAction ,
  updateProjectStateAction
} from 'src/core/store/modules/template/actions';
import { select, takeLatest, put, takeEvery } from 'redux-saga/effects'
import  { AxiosResponse } from 'axios';
import { globalStateSelector } from 'src/core/store/modules/template/selector';
import { GlobalState } from 'src/core/store/modules/template/reducer';
import axios from 'src/axios';

function* updateProjectStateSaga(action: ReturnType<typeof updateProjectStateAction>) {
  yield axios.post('/api/wace', action.payload)
}

function* updateFilesSaga(action: ReturnType<typeof updateFilesAction>) {
  yield axios.post('/api/wace/asset', action.payload)
  yield put(fetchProjectStateAction())
}

function* deleteFileSaga(action: ReturnType<typeof deleteFileAction>) {
  yield axios.delete(`/api/wace/asset/${action.payload}`)
  yield put(fetchProjectStateAction())
}

function* fetchProjectStateSaga(action: ReturnType<typeof fetchProjectStateAction>) {
  const globalState: GlobalState = yield select(globalStateSelector);

  try {
    const { data }: AxiosResponse<GlobalState> = yield axios.get('/api/wace')
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
  yield takeLatest(updateFilesAction, updateFilesSaga);
  yield takeEvery(deleteFileAction, deleteFileSaga);
}
