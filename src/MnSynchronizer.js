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
          title="Authenticate"
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
      console.log(dbs);
      if (dbs[0].syncAddr && dbs[0].authAddr) {
        let xhr = new XhrPromise(dbs[0].authAddr);
        return xhr.get().catch((err) => {
          console.log("error first request: " + err);
          return _authProm().then((authData) => {
            let authXhr = new XhrPromise(dbs[0].authAddr);

            authXhr.data = authData;

            return authXhr.post();
          });
        }).then(() => {
          return this.context.repo.syncDb(dbs[0]);
        }).then(() => {
          this.context.pubsub.publish("info.debug.sync.end");
        }).catch(() => {
          this.context.pubsub.publish("error.debug.sync");
        });
      }
    });
  }

  _authProm() {
    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
      this.setState({
        showAuthentication: true
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
