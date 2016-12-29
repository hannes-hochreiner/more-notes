import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import XhrPromise from "./XhrPromise";

class MnSynchronizer extends Component {
  constructor(props) {
    super(props);

    this._dbs = this.props.dbs;

    this.state = {
      showAuthentication: false
    };
  }

  componentDidMount() {
    // this.context.pubsub.subscribe("info", this.queueMessage.bind(this));
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCancel.bind(this)}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={false}
        onTouchTap={this.handleOk.bind(this)}
      />,
    ];

    return (
      <div>
        <FlatButton label="Sync" onTouchTap={this.sync.bind(this)}/>
        <Dialog
          title={this.state.dbTitle}
          actions={actions}
          modal={true}
          open={this.state.showAuthentication}
          onRequestClose={this.handleCancel.bind(this)}
          autoScrollBodyContent={true}
        >
          <TextField
            floatingLabelText="User"
            onChange={this.handleUserChange.bind(this)}
            value={this.state.user}
          />
          <TextField
            floatingLabelText="Password"
            type="password"
            onChange={this.handlePasswordChange.bind(this)}
            value={this.state.password}
          />
        </Dialog>
      </div>
    );
  }

  sync() {
    this.context.pubsub.publish("info.debug.sync.start");

    this.context.repo.getAllDbs().then((dbs) => {
      return dbs.filter((db) => {
        return db.syncAddr && db.syncAddr !== "";
      }).reduce((currProm, nextDb) => {
        if (!currProm) {
          return this._syncDb(nextDb);
        } else {
          return currProm.then(() => this._syncDb(nextDb));
        }
      });
    }).then(() => {
      this.context.pubsub.publish("info.debug.sync.end");
    }).catch(() => {
      this.context.pubsub.publish("error.debug.sync");
    }).then(() => {
      this.context.pubsub.publish("info.db.sync");
    });
  }

  _syncDb(db) {
    if (!(db.authAddr && db.authAddr !== "") {
      return this.context.repo.syncDb(db);
    }

    return this.context.repo.syncDb(db).catch(() => {
      console.log("first try failed");
      return this._authProm(db.title).then((authData) => {
        let authXhr = new XhrPromise(dbs[0].authAddr);

        authXhr.data = {
          name: authData.user,
          password: authData.password
        };

        return authXhr.post().then(() => {
          console.log("trying to sync again");
          return this.context.repo.syncDb(dbs[0]);
        });
      });
    });
  }

  _authProm(dbTitle) {
    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
      this.setState({
        showAuthentication: true,
        dbTitle: dbTitle
      });
    });
  }

  handleCancel() {
    this.context.pubsub.publish("info.debug.cancel");
    this.setState({
      showAuthentication: false
    });
    let reject = this._reject;
    delete this._reject;
    reject();
  }

  handleOk() {
    this.context.pubsub.publish("info.debug.ok");
    let resolve = this._resolve;
    delete this._resolve;
    let res = {
      user: this.state.user,
      password: this.state.password
    };
    this.setState({
      user: null,
      password: null,
      showAuthentication: false
    });
    resolve(res);
  }

  handleUserChange(event) {
    this.setState({
      user: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }
}

MnSynchronizer.contextTypes = {
  pubsub: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default MnSynchronizer;
