import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import "url-search-params-polyfill";

import rootReducer from "./reducers/rootReducer";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureSocket from "./utils/socket";
import common_de from "./translations/de/common.json";
import common_en from "./translations/en/common.json";

const translationsObject = {
  en: common_en,
  de: common_de
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale('en'));

export const socket = configureSocket(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
