// USER TOKEN
export const saveSignature = (token) => {
  localStorage.setItem("signin_signature", token);
};

export const getSignature = () => {
  var signature = localStorage.getItem("signin_signature");
  return signature ? signature : "";
};

export const removeSignature = () => {
  localStorage.removeItem("signin_signature");
};
