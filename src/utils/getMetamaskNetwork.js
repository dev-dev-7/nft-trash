export const getMetamaskNetwork = async (version) => {
  switch (version) {
    case "0x1":
      return "ETHEREUM";
    case "0x38":
      return "BINANANCE";
    case "0x89":
      return "POLYGON";
    default:
      return "ETHEREUM";
  }
};
