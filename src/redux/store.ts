import cart from "./reducers/cart";
import { readCartFromStorage } from "./thunks/cart";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    cart: cart,
  },
});

store.dispatch(readCartFromStorage());

export type AppDispatch = typeof store.dispatch;

export default store;
