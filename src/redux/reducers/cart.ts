import { PayloadAction } from "@reduxjs/toolkit";
import CartItem from "types/CartItem";
import CartRow from "types/CartRow";
import { storeCartToCookie } from "../thunks/cart";
import { CartState } from "../../types/appTypes";

const { createSlice, isAnyOf } = require("@reduxjs/toolkit");

const isAddToCart = (action: { type: string }) => {
  return action.type.endsWith("/addToCartAction");
};
const isRemoveFromCart = (action: { type: string }) => {
  return action.type.endsWith("/removeFromCartAction");
};
const isIncreaseQty = (action: { type: string }) => {
  return action.type.endsWith("/increaseQtyAction");
};
const isDecreaseQty = (action: { type: string }) => {
  return action.type.endsWith("/decreaseQtyAction");
};
const isPushCart = (action: { type: string }) => {
  return action.type.endsWith("/pushCartAction");
};

const isCartAction = (action: any) => {
  return isAnyOf(
    isAddToCart,
    isRemoveFromCart,
    isIncreaseQty,
    isDecreaseQty,
    isPushCart,
  )(
    action,
  );
};

var initialState: CartState = {
  items: {},
  total: 0,
  indirizzo: "",
  orario: "",
  note: "",
  tipologia_consegna: "asporto",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartAction: (
      state: CartState,
      action: PayloadAction<CartItem>,
    ) => {
      state.items[action.payload.id] = {
        item: action.payload,
        quantity: 1,
      };
    },
    removeFromCartAction: (
      state: CartState,
      action: PayloadAction<CartItem>,
    ) => {
      delete state.items[action.payload.id];
      //calcolo il subtotale
    },
    increaseQtyAction: (
      state: CartState,
      action: PayloadAction<CartItem>,
    ) => {
      state.items[action.payload.id].quantity += 1;
    },

    decreaseQtyAction: (
      state: CartState,
      action: PayloadAction<CartItem>,
    ) => {
      if (state.items[action.payload.id].quantity > 1) {
        state.items[action.payload.id].quantity -= 1;
      } else {
        //altrimenti elimina il prodotto
        delete state.items[action.payload.id];
      }
    },
    pushCartAction: (state: CartState, action: PayloadAction<CartRow[]>) => {
      state.items = action.payload;
    },
    pushTipologiaConsegna: (state: CartState, action: any) => {
      state.tipologia_consegna = action.payload;
    },
    pushIndirizzo: (state: CartState, action: any) => {
      state.indirizzo = action.payload;
    },
    pushOrario: (state: CartState, action: any) => {
      state.orario = action.payload;
    },
    pushNote: (state: CartState, action: any) => {
      state.note = action.payload;
    },
  },
  extraReducers: (
    builder: {
      addMatcher: (
        arg0: (action: any) => any,
        arg1: (state: any) => void,
      ) => void;
    },
  ) => {
    builder.addMatcher(
      isCartAction,
      (
        state: CartState,
      ) => {
        state.total = 0;
        Object.values(state.items).forEach((row: any) => {
          state.total += row.item.price! *
            row.quantity;
        });

        storeCartToCookie(state.items);
      },
    );
  },
});

const { actions, reducer } = cartSlice;

export const {
  addToCartAction,
  decreaseQtyAction,
  increaseQtyAction,
  removeFromCartAction,
  pushCartAction,
  pushIndirizzo,
  pushOrario,
  pushNote,
  pushTipologiaConsegna,
} = actions;

export default reducer;
