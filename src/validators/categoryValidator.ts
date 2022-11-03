import * as yup from "yup";

export default yup.object({
  name: yup.string().required("Il campo nome è obbligatorio"),
  image: yup.mixed().test(
    "fileSize",
    "File troppo grande (max 1 mega)",
    (value) => {
      if (value.length === 0) {
        return true;
      }

      return value.length && value[0].size <= 1000 * 1000;
    },
  )
    .test(
      "fileFormat",
      "Formato non accettato",
      (value) => {
        if (value.length === 0) {
          return true;
        }

        return value[0] &&
          ["image/jpg", "image/jpeg", "image/png"].includes(
            value[0].type,
          );
      },
    ),
}).required();
