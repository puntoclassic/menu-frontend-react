import axiosIstance from "services/axiosIstance";
import jwt_decode from "jwt-decode";

const accountService = {
  login: async (email: string, password: string) => {
    try {
      var response = await axiosIstance.post("/api/account/login", {
        email: email,
        password: password,
      });

      var { token } = response.data;

      var user: any = jwt_decode(token);

      if (user.verified) {
        return {
          status: "Ok",
          user: user,
        };
      } else {
        return {
          status: "NotVerified",
        };
      }
    } catch (error) {
      return {
        status: "LoginFailed",
      };
    }
  },

  validateLogin: (email: string, password: string) => {
    return axiosIstance.post("/api/account/validateLogin", {
      email: email,
      password: password,
    });
  },
  verifyEmailIsBusy: (email: string) => {
    return axiosIstance.post("/api/account/emailIsBusy", {
      email: email,
    });
  },
};

export default accountService;
