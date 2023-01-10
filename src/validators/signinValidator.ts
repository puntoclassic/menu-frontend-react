import accountService from "@src/services/accountService";
import * as yup from "yup";

export default yup.object({
  firstname: yup.string().required("Il campo nome è obbligatorio"),
  lastname: yup.string().required("Il campo cognome è obbligatorio"),
  email: yup.string().email("Inserisci un indirizzo email valido").required(
    "Questo campo è obbligatorio",
  ).test("is-busy", "Email in uso", function (value) {
    return new Promise((res, rej) => {
      accountService.verifyEmailIsBusy(value!).then((response) => {
        if (response.data.status === "Email free") {
          res(true);
        } else {
          res(false);
        }
      });
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
