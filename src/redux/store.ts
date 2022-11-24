import account from "./reducers/account";
import cart from "./reducers/cart";
import { loadAccountState } from "./thunks/account";
import { readCartFromStorage } from "./thunks/cart";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    cart: cart,
    account: account,
  },
});

store.dispatch(readCartFromStorage());
store.dispatch(loadAccountState());

export type AppDispatch = typeof store.dispatch;

export default store;
