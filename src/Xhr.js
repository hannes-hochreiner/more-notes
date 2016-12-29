export default class Xhr {
  constructor(XHR, pubsub) {
    this._xhr = XHR;
    this._pubsub = pubsub;
    this._pubsub.subscribe("action.sendRequest", this._sendRequest.bind(this));
  }

  _sendRequest(msg, data) {
    let req = new this._xhr();

    req.onload = () => {
      this._pubsub.publish("event.requestCompleted." + data.id, {
        id: data.id,
        data: this
      });
    };
    req.onerror = () => {
      this._pubsub.publish("event.requestCompleted." + data.id, {
        id: data.id,
        error: this
      });
    };
    req.onabort = () => {
      this._pubsub.publish("event.requestCompleted." + data.id, {
        id: data.id,
        error: this
      });
    };
    req.ontimeout = () => {
      this._pubsub.publish("event.requestCompleted." + data.id, {
        id: data.id,
        error: this
      });
    };
    req.open(data.method, data.url);
    req.withCredentials = true;
    req.setRequestHeader("Content-type", "application/json");

    if (data.data) {
      req.send(JSON.stringify(data.data));
    } else {
      req.send();
    }
  }
}
