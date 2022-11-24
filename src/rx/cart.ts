import { CartState } from "types/appTypes";
import { ReplaySubject } from "rxjs";
import axiosIstance from "services/axiosIstance";

const subject = new ReplaySubject<CartState>(1);
var state: CartState = {
  items: {},
  total: 0,
  indirizzo: "",
  orario: "",
  note: "",
  tipologia_consegna: "asporto",
};

export const cartStore = {
  subscribe: (setState: any) => subject.subscribe(setState),
  getSubject: () => subject,
  refreshCart: () => {
    state.total = 0;
    Object.values(state.items).forEach((row: any) => {
      state.total += row.item.price! *
        row.quantity;
    });
    cartStore.storeCartToCookie();
    subject.next({
      ...state,
    });
  },
  addToCart: (item: any) => {
    state.items[item.id] = {
      item: item,
      quantity: 1,
    };
    cartStore.refreshCart();
  },
  removeFromCart: (item: any) => {
    delete state.items[item.id];
    cartStore.refreshCart();
  },
  increaseQty: (item: any) => {
    console.log(item);
    state.items[item.id].quantity += 1;
    cartStore.refreshCart();
  },
  decreaseQty: (item: any) => {
    if (state.items[item.id].quantity > 1) {
      state.items[item.id].quantity -= 1;
    } else {
      //altrimenti elimina il prodotto
      delete state.items[item.id];
    }
    cartStore.refreshCart();
  },
  readCartFromStorage: () => {
    axiosIstance.get("/api/cart/cookie").then((response) => {
      if (Object.keys(response.data).length > 0) {
        state.items = response.data;
        cartStore.refreshCart();
      }
    });
  },
  storeCartToCookie: () => {
    axiosIstance.post("/api/cart/cookie", { cart: state.items });
  },
  updateTipologiaConsegna: (tipologiaConsegna: string) => {
    state.tipologia_consegna = tipologiaConsegna;
    cartStore.refreshCart();
  },
  updateIndirizzo: (indirizzo: string) => {
    state.indirizzo = indirizzo;
    cartStore.refreshCart();
  },
  updateOrario: (orario: string) => {
    state.orario = orario;
    cartStore.refreshCart();
  },
  updateNote: (note: string) => {
    state.note = note;
    cartStore.refreshCart();
  },
};
