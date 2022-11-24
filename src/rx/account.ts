import {
  AccountSigninStatus,
  AccountState,
  AccountVerifyStatus,
} from "types/appTypes";
import { Observable, ReplaySubject } from "rxjs";
import SigninFields from "types/SigninFields";
import VerifyAccountFields from "types/VerifyAccountFields";
import PersonalInfoFields from "types/PersonalInfoFields";
import ChangePasswordFields from "types/ChangePasswordFields";
import ResetPasswordFields from "types/ResetPasswordFields";
import ResetPasswordTokenFields from "types/ResetPasswordTokenFields";
import axiosIstance from "services/axiosIstance";
import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";

const subject = new ReplaySubject<AccountState>(1);

var state: AccountState = {
  user: null,
  signinStatus: AccountSigninStatus.none,
  verifyAccountStatus: AccountVerifyStatus.none,
  pendingRequest: false,
  userLogged: null,
};

export const accountStore = {
  subscribe: (setState: any) => subject.subscribe(setState),
  login: (email: string, password: string) => {
    return new Observable((emitter) => {
      axiosIstance.post("/api/account/login", {
        email: email,
        password: password,
      }).then((response) => {
        var { token } = response.data;

        var user: any = jwtDecode(token);

        if (user.verified) {
          accountStore.loadAccountState();
          emitter.next({ status: "Ok", user: user });
        } else {
          emitter.next({ status: "NotVerified" });
        }
      }).catch((err) => {
        console.log(err);
        emitter.error();
      });
    });
  },
  logout: () => {
    return new Observable((emitter) => {
      axiosIstance.get("/api/account/logout");
      subject.next({
        ...state,
        user: null,
        userLogged: false,
      });
      emitter.complete();
    });
  },
  signin: (data: SigninFields) => {
    return new Observable((emitter) => {
      axiosIstance.post("/api/account/signin", data).then(() => {
        emitter.next();
      }).catch(() => {
        emitter.error();
      });
    });
  },
  resendActivationEmail: (data: VerifyAccountFields) => {
    return new Observable((emitter) => {
      axiosIstance.post(
        "/api/account/resend-activation-email",
        data,
      ).then(() => {
        emitter.next();
      }).catch((err) => {
        emitter.error();
      });
    });
  },
  activateAccountByToken: (token: string) => {
    return new Observable((emitter) => {
      axiosIstance.post(
        "/api/account/activateAccount",
        {
          token: token,
        },
      ).then(() => {
        subject.next({
          ...state,
          verifyAccountStatus: AccountVerifyStatus.success,
        });
        emitter.next();
      }).catch((err) => {
        subject.next({
          ...state,
          verifyAccountStatus: AccountVerifyStatus.failed,
        });
        emitter.error();
      });
    });
  },
  refreshAccountState: () => {
    axiosIstance.get("/api/account/session").then((response) => {
      subject.next({
        ...state,
        user: response.data,
        userLogged: true,
      });
    }).catch((err) => {
      subject.next({
        ...state,
        user: null,
        userLogged: false,
      });
    });

    return;
  },
  loadAccountState: () => {
    axiosIstance.get("/api/account/status").then((response) => {
      subject.next({
        ...state,
        user: response.data,
        userLogged: true,
      });
    }).catch((err) => {
      subject.next({
        ...state,
        user: null,
        userLogged: false,
      });
    });
  },
  updatePersonalInfo: (data: PersonalInfoFields) => {
    return new Observable((emitter) => {
      try {
        axiosIstance.post(
          "/api/account/updatePersonalInfo",
          data,
        );
        emitter.next(true);
      } catch (err) {
        emitter.error();
      }
    });
  },
  updatePassword: (data: ChangePasswordFields) => {
    return new Observable((emitter) => {
      axiosIstance.post("/api/account/updatePassword", data).then(() => {
        emitter.next({
          status: "Success",
        });
      }).catch((err) => {
        var axiosError = err as AxiosError;

        if (axiosError.response!.status === 403) {
          emitter.next({
            status: "BadCurrentPassword",
          });
        } else {
          emitter.next({
            status: "Error",
          });
        }

        emitter.error();
      });
    });
  },
  resetPassword: (data: ResetPasswordFields) => {
    return new Observable((emitter) => {
      axiosIstance.post("/api/account/resetPassword", data).then(() => {
        emitter.next(true);
      }).catch((err) => {
        emitter.error();
      });
    });
  },
  resetPasswordByToken: (data: ResetPasswordTokenFields) => {
    return new Observable((emitter) => {
      axiosIstance.post("/api/account/updatePasswordByToken", data).then(() => {
        emitter.next(true);
      }).catch((err) => {
        emitter.error();
      });
    });
  },
};
