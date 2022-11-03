import * as yup from "yup";

export default yup.object({
  site_name: yup.string().required("Il campo nome del sito è obbligatorio"),
  shipping_costs: yup.number().typeError("Inserisci un numero valido").min(
    0.01,
    "Il prezzo deve essere maggiore di 0",
  ),
  order_created_state_id: yup.string().required("Seleziona uno stato valido"),
  order_paid_state_id: yup.string().required("Seleziona uno stato valido"),
});
