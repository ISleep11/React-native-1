import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import dataReducer from "./slice";
import { watchFetchData } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: dataReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchData);

export type RootState = ReturnType<typeof store.getState>;

export default store;
