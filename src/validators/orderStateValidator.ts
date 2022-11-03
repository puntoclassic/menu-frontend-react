import * as yup from "yup";

export default yup.object({
  name: yup.string().required("Il campo nome è obbligatorio"),
});
