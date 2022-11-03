import axios from "axios";
import configService from "services/configService";

var axiosIstance = axios.create({
  baseURL: configService.backendUrl(),
  withCredentials: true,
});

export default axiosIstance;
