'use strict';
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";


const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore(initialState: AppState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
