import * as yup from "yup";

export default yup.object({
  indirizzo: yup.string().required("L'indirizzo è obbligatorio"),
  orario: yup.string().required("L'orario è obbligatorio"),
});
