import { combineReducers } from "redux";
import { i18nReducer } from 'react-redux-i18n';
import user from "./user";
import listing from "./listing";
import message from "./message";
import buyer from "./buyer";
import wanted from "./wanted";
import notification from "./notification";

const appReducer = combineReducers({
  user,
  listing,
  message,
  buyer,
  wanted,
  i18n: i18nReducer,
  notification
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
