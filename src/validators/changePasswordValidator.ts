import { AxiosError, AxiosResponse } from "axios";
import accountService from "@src/services/accountService";
import * as yup from "yup";

export default yup.object({
  email: yup.string().email("Inserisci un indirizzo email valido").required(
    "Questo campo è obbligatorio",
  ),
  currentPassword: yup.string().required("La password attuale è obbligatoria")
    .test("is-valid", "Password attuale non valida", function (value) {
      return new Promise((res, rej) => {
        if (value !== "" && this.parent.email !== "") {
          accountService.validateLogin(this.parent.email, value!).then(
            (response: AxiosResponse) => {
              if (response.status === 200) {
                res(true);
              } else {
                res(false);
              }
            },
          ).catch((error: AxiosError) => {
            if (error.response!.status !== 200) {
              res(false);
            }
          });
        } else {
          res(true);
        }
      });
    }),
  password: yup.string().matches(
    RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
    "La password deve essere lunga almeno 8 caratteri e contenere: 1 numero, 1 carattere speciale e una lettera maiuscola",
  ).required("Il campo password è obbligatorio"),
  confirmPassword: yup.string().required(
    "Il campo conferma password è obbligatorio",
  ).oneOf([yup.ref("password"), null], "Le due password devono corrispondere"),
}).required();
