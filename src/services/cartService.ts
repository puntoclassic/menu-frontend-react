import axiosIstance from "services/axiosIstance";

const getCartCookieData = () => {
  return axiosIstance.get("/api/cart/cookie");
};

const pushCartCookieData = (data: any) => {
  return axiosIstance.post("/api/cart/cookie", { cart: data });
};

export const cartService = {
  getCartCookieData,
  pushCartCookieData,
};
