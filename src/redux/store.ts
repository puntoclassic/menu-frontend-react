import account from "./reducers/account";
import app from "./reducers/app";
import cart from "./reducers/cart";
import messages from "./reducers/messages";
import { loadAccountState } from "./thunks/account";
import { fetchCategories, fetchSettings } from "./thunks/app";
import { readCartFromStorage } from "./thunks/cart";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    app: app,
    messages: messages,
    cart: cart,
    account: account,
  },
});

store.dispatch(fetchCategories());
store.dispatch(readCartFromStorage());
store.dispatch(fetchSettings());
store.dispatch(loadAccountState());

export type AppDispatch = typeof store.dispatch;

export default store;
