import axios from "axios";
import configService from "@src/services/configService";

var axiosIstance = axios.create({
  baseURL: configService.backendUrl(),
  withCredentials: true,
});

export default axiosIstance;
