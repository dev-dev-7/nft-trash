import instance from "./config";

class Axios {
  post(url, body) {
    return instance.post(url, body);
  }
  get(url) {
    return instance.get(url);
  }
}

export default new Axios();
