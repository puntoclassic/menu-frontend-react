import axiosIstance from "services/axiosIstance";
import SigninFields from "types/SigninFields";
import VerifyAccountFields from "types/VerifyAccountFields";
import PersonalInfoFields from "types/PersonalInfoFields";
import ChangePasswordFields from "types/ChangePasswordFields";
import { AxiosError } from "axios";
import ResetPasswordFields from "types/ResetPasswordFields";
import ResetPasswordTokenFields from "types/ResetPasswordTokenFields";

const accountService = {
  login: async (email: string, password: string) => {
    try {
      var response = await axiosIstance.post("/api/account/login", {
        email: email,
        password: password,
      });

      var { user } = response.data;

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
  logout: () => {
    return axiosIstance.get("/api/account/logout");
  },
  signin: async (data: SigninFields) => {
    try {
      await axiosIstance.post("/api/account/signin", data);

      return true;
    } catch (error) {
      return false;
    }
  },
  resendActivationEmail: async (data: VerifyAccountFields) => {
    await axiosIstance.post(
      "/api/account/resend-activation-email",
      data,
    );
  },
  activateAccountByToken: async (token: string) => {
    try {
      await axiosIstance.post(
        "/api/account/activateAccount",
        {
          token: token,
        },
      );

      return true;
    } catch (error) {
      return false;
    }
  },
  refreshAccountState: () => {
    return axiosIstance.get("/api/account/session");
  },
  loadAccountState: async () => {
    try {
      var response = await axiosIstance.get("/api/account/status");

      return {
        user: response.data,
        isLogged: true,
      };
    } catch (error: any) {
      return {
        user: null,
        isLogged: false,
      };
    }
  },
  updatePersonalInfo: async (data: PersonalInfoFields) => {
    try {
      await axiosIstance.post(
        "/api/account/updatePersonalInfo",
        data,
      );

      return true;
    } catch (error: any) {
      return false;
    }
  },
  updatePassword: async (data: ChangePasswordFields) => {
    try {
      await axiosIstance.post("/api/account/updatePassword", data);

      return {
        status: "Success",
      };
    } catch (error: any) {
      var axiosError = error as AxiosError;
      if (axiosError.response!.status === 403) {
        return {
          status: "BadCurrentPassword",
        };
      } else {
        return {
          status: "Error",
        };
      }
    }
  },
  resetPassword: async (data: ResetPasswordFields) => {
    try {
      await axiosIstance.post("/api/account/resetPassword", data);
      return true;
    } catch (error) {
      return false;
    }
  },
  resetPasswordByToken: async (data: ResetPasswordTokenFields) => {
    try {
      await axiosIstance.post("/api/account/updatePasswordByToken", data);
      return true;
    } catch (error) {
      return false;
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
