import React from "react";
import ReactDOM from "react-dom";
// Can access state from anywhere
import {Provider} from "react-redux"
import {createStore, applyMiddleware, compose} from "redux"
import thunk from "thunk"
import App from "./App";

import reducers from "./reducers"
const store = createStore(reducers, compose(applyMiddleware(thunk)))
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);