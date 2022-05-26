export default function getDiraction(language) {
  switch (language) {
    case "ar":
      return "rtl";
    default:
      return "ltr";
  }
}
