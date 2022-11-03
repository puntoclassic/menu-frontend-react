import axiosIstance from "services/axiosIstance";
import SettingFields from "types/admin/SettingFields";

const backendUrl = "http://localhost:4000/";

const configService = {
  backendUrl: () => {
    return backendUrl;
  },
  updateSettings: async (data: SettingFields) => {
    try {
      await axiosIstance.post("/api/admin/setting/", data);
      return true;
    } catch (error) {
      return false;
    }
  },
  getSettings: () => {
    return axiosIstance.get("/api/admin/setting/");
  },
};

export default configService;
