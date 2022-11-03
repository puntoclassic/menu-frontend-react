import * as yup from "yup";

export default yup.object({
  name: yup.string().required("Il campo nome è obbligatorio"),
  price: yup.number().typeError("Inserisci un numero valido").required(
    "Il campo prezzo è obbligatorio",
  ).min(
    0.01,
    "Il prezzo deve essere maggiore di 0",
  ),
  category_id: yup.number().required("La categoria è obbligatoria"),
}).required();
