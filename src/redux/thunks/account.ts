import SigninFields from "types/SigninFields";
import VerifyAccountFields from "types/VerifyAccountFields";
import {
  updatePending,
  updateSigninStatus,
  updateUser,
  updateUserLogged,
  updateVerificationStatus,
} from "../reducers/account";
import { AccountSigninStatus, AccountVerifyStatus } from "../../types/appTypes";
import PersonalInfoFields from "types/PersonalInfoFields";
import ChangePasswordFields from "types/ChangePasswordFields";
import ResetPasswordFields from "types/ResetPasswordFields";
import ResetPasswordTokenFields from "types/ResetPasswordTokenFields";
import accountService from "services/accountService";
import { messagesStore } from "rx/messages";

export function login(email: string, password: string) {
  return async function (dispatch: any, getState: any) {
    dispatch(updatePending(true));

    var loginResponse = await accountService.login(email, password);

    if (loginResponse.status === "Ok") {
      const { user } = loginResponse;
      dispatch(loadAccountState());
      setTimeout(() => {
        messagesStore.push(
          "success",
          "Bentornato " + user.firstname + " " + user.lastname,
        );
      }, 50);
    }

    if (loginResponse.status === "LoginFailed") {
      messagesStore.push(
        "error",
        "Impossibile accedere, credenziali errate.",
      );
    }

    if (loginResponse.status === "NotVerified") {
      messagesStore.push(
        "info",
        "Devi attivare il tuo account per poter accedere ad alcune sezioni del sito.",
      );
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
    messagesStore.reset();

    await accountService.resendActivationEmail(data);

    messagesStore.push(
      "success",
      "Richiesta inviata, controlla la tua casella di posta",
    );
  };
}

export function activateAccountByToken(token: string) {
  return async function (dispatch: any, getState: any) {
    if (await accountService.activateAccountByToken(token)) {
      dispatch(updateVerificationStatus({
        status: AccountVerifyStatus.success,
      }));

      messagesStore.push(
        "success",
        "Il tuo account è stato attivato, ora puoi procedere con il login",
      );
    } else {
      dispatch(updateVerificationStatus({
        status: AccountVerifyStatus.failed,
      }));
      messagesStore.push(
        "error",
        "Impossibile verificare il tuo account, token non valido",
      );
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
    messagesStore.reset();
    dispatch(updatePending(true));

    if (await accountService.updatePersonalInfo(data)) {
      dispatch(loadAccountState());

      messagesStore.push(
        "success",
        "Informazioni aggiornate con successo",
      );
    } else {
      messagesStore.push(
        "error",
        "Si è verificato un errore nel gestire la richiesta",
      );
    }
    dispatch(updatePending(false));
  };
}

export function updatePassword(data: ChangePasswordFields) {
  return async function (dispatch: any, getState: any) {
    messagesStore.reset();
    dispatch(updatePending(true));

    var response = await accountService.updatePassword(data);

    if (response.status === "Success") {
      messagesStore.push(
        "success",
        "Password cambiata con successo",
      );
    }

    if (response.status === "BadCurrentPassword") {
      messagesStore.push(
        "error",
        "La password attuale è errata",
      );
    }

    if (response.status === "Error") {
      messagesStore.push(
        "error",
        "Si è verificato un errore inaspettato",
      );
    }

    dispatch(updatePending(false));
  };
}

export function resetPassword(data: ResetPasswordFields) {
  return async function (dispatch: any, getState: any) {
    messagesStore.reset();
    dispatch(updatePending(true));

    if (await accountService.resetPassword(data)) {
      messagesStore.push(
        "success",
        "Segui le istruzioni via email per effettuare il reset della password",
      );
    } else {
      messagesStore.push(
        "error",
        "Si è verificato un errore inaspettato",
      );
    }

    dispatch(updatePending(false));
  };
}

export function resetPasswordByToken(data: ResetPasswordTokenFields) {
  return async function (dispatch: any, getState: any) {
    messagesStore.reset();
    dispatch(updatePending(true));

    if (await accountService.resetPasswordByToken(data)) {
      messagesStore.push(
        "success",
        "Password cambiata con successo",
      );
    } else {
      messagesStore.push(
        "error",
        "Token non valido",
      );
    }

    dispatch(updatePending(false));
  };
}
