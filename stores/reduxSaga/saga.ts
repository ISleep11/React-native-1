import { call, put, takeLatest } from "redux-saga/effects"; // effects
import { fetchDataRequest, fetchDataSuccess } from "./slice";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function* fetchData(): Generator<any, void, Todo> { // worker
  try {
    const response = yield call(() =>
      fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
        res.json()
      )
    );
    yield put(fetchDataSuccess(response));
  } catch (error) {
    throw error;
  }
}

export function* watchFetchData() {
  yield takeLatest(fetchDataRequest.type, fetchData); // watcher
}
