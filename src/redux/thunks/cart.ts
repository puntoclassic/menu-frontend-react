import { cartService } from "services/cartService";
import {
  addToCartAction,
  decreaseQtyAction,
  increaseQtyAction,
  pushCartAction,
  removeFromCartAction,
} from "../reducers/cart";

export function addToCart(item: any) {
  return function (dispatch: any, getState: any) {
    dispatch(addToCartAction(item));
  };
}

export function removeFromCart(item: any) {
  return function (dispatch: any, getState: any) {
    dispatch(removeFromCartAction(item));
  };
}

export function increaseQty(item: any) {
  return function (dispatch: any, getState: any) {
    dispatch(increaseQtyAction(item));
  };
}

export function decreaseQty(item: any) {
  return function (dispatch: any, getState: any) {
    dispatch(decreaseQtyAction(item));
  };
}

export function readCartFromStorage() {
  return async function (dispatch: any, getState: any) {
    var response = await cartService.getCartCookieData();

    if (Object.keys(response.data).length > 0) {
      dispatch(pushCartAction(JSON.parse(response.data as string)));
    }
  };
}

export async function storeCartToCookie(state: string) {
  await cartService.pushCartCookieData(state);
}
