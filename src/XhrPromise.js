export default class XhrPromise {
  constructor(url) {
    this._url = url;
  }

  set data(data) {
    this._data = data;
  }

  post() {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();

      // req.addEventListener("onreadystatechange", () => { console.log(this); });
      req.addEventListener("load", () => { resolve(); });
      req.addEventListener("error", () => { reject("error"); });
      req.addEventListener("abort", () => { reject("abort"); });
      req.addEventListener("timeout", () => { reject("timeout"); });
      req.open("POST", this._url);
      req.withCredentials = true;
      req.setRequestHeader("Content-type", "application/json");

      if (this._data) {
        req.send(JSON.stringify(this._data));
      } else {
        req.send();
      }
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();

      req.addEventListener("load", () => { resolve(); });
      req.addEventListener("error", () => { reject("error"); });
      req.addEventListener("abort", () => { reject("abort"); });
      req.addEventListener("timeout", () => { reject("timeout"); });
      req.open("GET", this._url);
      req.withCredentials = true;
      req.setRequestHeader("Content-type", "application/json");

      if (this._data) {
        req.send(JSON.stringify(this._data));
      } else {
        req.send();
      }
    });
  }
}
