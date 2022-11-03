import * as yup from "yup";

export default yup.object({
  tipologia_consegna: yup.string().required("La tipologia è obbligatoria"),
});
