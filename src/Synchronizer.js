export default class Synchronizer {
  constructor(repo, pubsub, uuid) {
    this._repo = repo;
    this._pubsub = pubsub;
    this._uuid = uuid;
    this._pubsub.subscribe("action.syncDb", this._sync.bind(this));
  }

  _sync(msg, data) {
    let prom = this._repo.syncDb(data.db);

    if (data.db.authAddr) {
      prom = prom.catch(() => {
        return this._getCredentials(data.db.title)
          .then((cred) => { return this._sendAuthRequest(cred, data.db.authAddr); })
          .then(() => { return this._repo.syncDb(data.db); });
      });
    }

    prom.then(() => {
      this._pubsub.publish("event.dbSyncCompleted." + data.id, {
        id: data.id
      });
    }).catch(() => {
      this._pubsub.publish("event.dbSyncCompleted." + data.id, {
        id: data.id,
        error: "Synchronization failed."
      });
    });
  }

  _sendAuthRequest(cred, url) {
    return new Promise((rs, rj) => {
      let id = this._uuid();

      this._pubsub.subscribe("event.requestCompleted." + id, (res) => {
        this._pubsub.unsubscribe("event.requestCompleted." + id);

        if (res.error) {
          rj(res.error);
        } else {
          rs();
        }
      });

      this._pubsub.publish("action.sendRequest", {
        id: id,
        data: {
          name: cred.user,
          password: cred.password
        },
        method: "POST",
        url: url
      });
    });
  }

  _getCredentials(title) {
    return new Promise((rs, rj) => {
      let id = this._uuid();

      this._pubsub.subscribe("event.credentialsObtained." + id, (msg, data) => {
        this._pubsub.unsubscribe("event.credentialsObtained." + id);

        if (data.data) {
          rs(data.data);
        } else {
          rj(data.error);
        }
      });

      this._pubsub.publish("action.getCredentials", {
        id: id,
        title: title
      });
    });
  }
}
