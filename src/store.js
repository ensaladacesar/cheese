import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

function saveStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("perState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadStorage() {
  try {
    const serialisedState = localStorage.getItem("perState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = createStore(
  reducer,
  loadStorage(),
  compose(
    applyMiddleware(thunk),
    typeof window === "object" &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

store.subscribe(() => saveStorage(store.getState()));

export default store;
