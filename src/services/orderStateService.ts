import axiosIstance from "services/axiosIstance";
import OrderStateFields from "types/admin/OrderStateFields";

const orderStateService = {
  getOrderStateForSelect: () => {
    return axiosIstance.get("/api/admin/orderState");
  },
  adminFetchOrderStates: async (params: any) => {
    try {
      var response = await axiosIstance.post("/api/admin/orderState", params);
      return { status: "success", ...response.data };
    } catch (error) {
      return { status: "error" };
    }
  },
  createOrderState: async (data: OrderStateFields) => {
    try {
      await axiosIstance.post("/api/admin/orderState/create/", data);
      return true;
    } catch (error) {
      return false;
    }
  },
  updateOrderState: async (data: OrderStateFields) => {
    try {
      await axiosIstance.post("/api/admin/orderState/update/", data);
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteOrderState: async (id: number) => {
    try {
      await axiosIstance.post("/api/admin/orderState/delete/", {
        id: id,
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  getOrderState: (id: number) => {
    return axiosIstance.get("/api/admin/orderState/" + id);
  },
};

export default orderStateService;
