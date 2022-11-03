import axiosIstance from "services/axiosIstance";
import FoodFields from "types/admin/FoodFields";

const foodService = {
  getFoodsByCategorySlug: (slug: string) => {
    return axiosIstance.get(
      "/api/foods/byCategorySlug?slug=" + slug,
    );
  },
  searchFoods: (key: string) => {
    return axiosIstance.get(
      "/api/foods/cerca?search=" + key,
    );
  },
  adminFetchFoods: async (params: any) => {
    try {
      var response = await axiosIstance.post("/api/admin/food", params);

      return { status: "success", ...response.data };
    } catch (error) {
      return { status: "error" };
    }
  },
  createFood: async (data: FoodFields) => {
    try {
      await axiosIstance.post("/api/admin/food/create/", data);
      return true;
    } catch (error) {
      return false;
    }
  },
  updateFood: async (data: FoodFields) => {
    try {
      await axiosIstance.post("/api/admin/food/update/", data);
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteFood: async (id: number) => {
    try {
      await axiosIstance.post("/api/admin/food/delete/", {
        id: id,
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  getFood: (id: number) => {
    return axiosIstance.get("/api/foods/" + id);
  },
};

export default foodService;
