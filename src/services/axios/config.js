import axios from "axios";

var instance = axios.create({
  baseURL: "https://api.rentnode.io/",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

// Request interceptor
// instance.interceptors.request.use(
//   (config) => {
//     if (getUser()) config.headers.Authorization = `${getUser().token ?? " "}`;
//     return config;
//   },
//   (request) => request,
//   (error) => new Error(error)
// );

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = ""; //  getToken();
    return config;
  },
  (request) => request,
  (error) => new Error(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    if (
      response?.data?.token != undefined &&
      response?.data?.token == "token_expired"
    ) {
      window.location.reload();
    } else {
      return response;
    }
  },
  (error) => new Error(error)
);

export default instance;
