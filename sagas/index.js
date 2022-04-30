import { all, fork } from 'redux-saga/effects';

import axios from 'axios';
import postSaga from './post';
import userSaga from './user';
import { backUrl, devUrl } from '../config/config';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? backUrl : devUrl;
axios.defaults.withCredentials = true;
export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
