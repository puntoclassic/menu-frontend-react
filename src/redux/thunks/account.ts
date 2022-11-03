import SigninFields from "types/SigninFields";
import VerifyAccountFields from "types/VerifyAccountFields";
import {
  updatePending,
  updateSigninStatus,
  updateUser,
  updateUserLogged,
  updateVerificationStatus,
} from "../reducers/account";
import { pushMessage, resetMessages } from "../reducers/messages";
import { AccountSigninStatus, AccountVerifyStatus } from "../types/reduxTypes";
import PersonalInfoFields from "types/PersonalInfoFields";
import ChangePasswordFields from "types/ChangePasswordFields";
import ResetPasswordFields from "types/ResetPasswordFields";
import ResetPasswordTokenFields from "types/ResetPasswordTokenFields";
import accountService from "services/accountService";

export function login(email: string, password: string) {
  return async function (dispatch: any, getState: any) {
    dispatch(updatePending(true));

    var loginResponse = await accountService.login(email, password);

    if (loginResponse.status === "Ok") {
      const { user } = loginResponse;
      dispatch(loadAccountState());
      setTimeout(() => {
        dispatch(pushMessage({
          "tag": "success",
          "message": "Bentornato " + user.firstname + " " + user.lastname,
        }));
      }, 50);
    }

    if (loginResponse.status === "LoginFailed") {
      dispatch(pushMessage({
        "tag": "error",
        "message": "Impossibile accedere, credenziali errate.",
      }));
    }

    if (loginResponse.status === "NotVerified") {
      dispatch(pushMessage({
        "tag": "info",
        "message":
          "Devi attivare il tuo account per poter accedere ad alcune sezioni del sito.",
      }));
    }

    dispatch(updatePending(false));
  };
}

export function logout() {
  return async function (dispatch: any, getState: any) {
    await accountService.logout();

    dispatch(updateUser({
      user: null,
    }));
  };
}

export function signin(data: SigninFields) {
  return async function (dispatch: any, getState: any) {
    dispatch(updatePending(true));

    var signinResponse = await accountService.signin(data);

    if (signinResponse) {
      dispatch(updateSigninStatus({
        status: AccountSigninStatus.success,
      }));
    } else {
      dispatch(updateSigninStatus({
        status: AccountSigninStatus.failed,
      }));
    }

    dispatch(updatePending(false));
  };
}

export function resendActivationEmail(data: VerifyAccountFields) {
  return async function (dispatch: any, getState: any) {
    dispatch(resetMessages());

    await accountService.resendActivationEmail(data);

    dispatch(pushMessage({
      "tag": "success",
      "message": "Richiesta inviata, controlla la tua casella di posta",
    }));
  };
}

export function activateAccountByToken(token: string) {
  return async function (dispatch: any, getState: any) {
    if (await accountService.activateAccountByToken(token)) {
      dispatch(updateVerificationStatus({
        status: AccountVerifyStatus.success,
      }));

      dispatch(pushMessage({
        "tag": "success",
        "message":
          "Il tuo account è stato attivato, ora puoi procedere con il login",
      }));
    } else {
      dispatch(updateVerificationStatus({
        status: AccountVerifyStatus.failed,
      }));
      dispatch(pushMessage({
        "tag": "error",
        "message": "Impossibile verificare il tuo account, token non valido",
      }));
    }
  };
}

//load the session state (expired or not)
export function refreshAccountState() {
  return async function (dispatch: any, getState: any) {
    try {
      var response = await accountService.refreshAccountState();

      dispatch(updateUser({
        user: response.data,
      }));
    } catch (error) {
      dispatch(updateUser({
        user: null,
      }));
    }
  };
}

//load the account status from server
export function loadAccountState() {
  return async function (dispatch: any, getState: any) {
    var response = await accountService.loadAccountState();

    dispatch(updateUser({
      user: response.user,
    }));

    dispatch(updateUserLogged(response.isLogged));
  };
}

export function updatePersonalInfo(data: PersonalInfoFields) {
  return async function (dispatch: any, getState: any) {
    dispatch(resetMessages());
    dispatch(updatePending(true));

    if (await accountService.updatePersonalInfo(data)) {
      dispatch(loadAccountState());

      dispatch(pushMessage({
        "tag": "success",
        "message": "Informazioni aggiornate con successo",
      }));
    } else {
      dispatch(pushMessage({
        "tag": "error",
        "message": "Si è verificato un errore nel gestire la richiesta",
      }));
    }
    dispatch(updatePending(false));
  };
}

export function updatePassword(data: ChangePasswordFields) {
  return async function (dispatch: any, getState: any) {
    dispatch(resetMessages());
    dispatch(updatePending(true));

    var response = await accountService.updatePassword(data);

    if (response.status === "Success") {
      dispatch(pushMessage({
        "tag": "success",
        "message": "Password cambiata con successo",
      }));
    }

    if (response.status === "BadCurrentPassword") {
      dispatch(pushMessage({
        "tag": "error",
        "message": "La password attuale è errata",
      }));
    }

    if (response.status === "Error") {
      dispatch(pushMessage({
        "tag": "error",
        "message": "Si è verificato un errore inaspettato",
      }));
    }

    dispatch(updatePending(false));
  };
}

export function resetPassword(data: ResetPasswordFields) {
  return async function (dispatch: any, getState: any) {
    dispatch(resetMessages());
    dispatch(updatePending(true));

    if (await accountService.resetPassword(data)) {
      dispatch(pushMessage({
        "tag": "success",
        "message":
          "Segui le istruzioni via email per effettuare il reset della password",
      }));
    } else {
      dispatch(pushMessage({
        "tag": "error",
        "message": "Si è verificato un errore inaspettato",
      }));
    }

    dispatch(updatePending(false));
  };
}

export function resetPasswordByToken(data: ResetPasswordTokenFields) {
  return async function (dispatch: any, getState: any) {
    dispatch(resetMessages());
    dispatch(updatePending(true));

    if (await accountService.resetPasswordByToken(data)) {
      dispatch(pushMessage({
        "tag": "success",
        "message": "Password cambiata con successo",
      }));
    } else {
      dispatch(pushMessage({
        "tag": "error",
        "message": "Token non valido",
      }));
    }

    dispatch(updatePending(false));
  };
}
