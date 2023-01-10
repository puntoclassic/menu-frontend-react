import axiosIstance from "@src/services/axiosIstance";
import CategoryFields from "@src/types/CategoryFields";

const categoryService = {
  getCategory: (id: number) => {
    return axiosIstance.get("/api/categories/" + id);
  },

  getCategoryBySlug: (slug: string) => {
    return axiosIstance.get(
      "/api/categories/bySlug/" + slug,
    );
  },
  fetchCategories: () => {
    return axiosIstance.get("/api/categories");
  },
  fetchCategoriesForSelect: () => {
    return axiosIstance.get("/api/categories/?cached=false&paginated=false");
  },
  adminFetchCategories: async (params: any) => {
    try {
      var response = await axiosIstance.post("/api/admin/category", params);

      return {
        status: "success",
        categories: response.data.categories,
        count: response.data.count,
      };
    } catch (error) {
      return {
        status: "error",
      };
    }
  },
  createCategory: async (data: CategoryFields) => {
    try {
      await axiosIstance.post("/api/admin/category/create/", {
        name: data.name,
        image: data.image[0],
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  updateCategory: async (data: CategoryFields) => {
    try {
      await axiosIstance.post("/api/admin/category/update/", {
        id: data.id,
        name: data.name,
        image: data.image[0],
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteCategory: async (id: number) => {
    try {
      await axiosIstance.post("/api/admin/category/delete/", { id: id });
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default categoryService;
