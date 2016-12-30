import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Credentials extends Component {
  constructor(props) {
    super(props);

    this._messages = [];
    this.state = {
      showAuthentication: false
    };
  }

  componentDidMount() {
    this.context.pubsub.subscribe("action.getCredentials", this._queueMessage.bind(this));
  }

  _queueMessage(msg, data) {
    this._messages.push(data);
    this._processMessages();
  }

  _processMessages() {
    if (this._message) {
      return;
    }

    if (this._messages.length === 0) {
      return;
    }

    this._message = this._messages.shift();
    this.setState({
      showAuthentication: true,
      title: this._message.title,
      user: null,
      password: null
    });
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
        <Dialog
          title={this.state.title}
          actions={actions}
          modal={true}
          open={this.state.showAuthentication}
          onRequestClose={this.handleCancel.bind(this)}
          autoScrollBodyContent={true}
        >
          <TextField
            floatingLabelText="User"
            onChange={this.handleUserChange.bind(this)}
            value={this.state.user || ""}
          />
          <TextField
            floatingLabelText="Password"
            type="password"
            onChange={this.handlePasswordChange.bind(this)}
            value={this.state.password || ""}
          />
        </Dialog>
      </div>
    );
  }

  handleCancel() {
    this.setState({
      showAuthentication: false,
      user: null,
      password: null
    });
    this.context.pubsub.publish("event.credentialsObtained." + this._message.id, {
      id: this._message.id,
      error: "Action cancelled."
    });
    delete this._message;
    this._processMessages();
  }

  handleOk() {
    let res = {
      user: this.state.user,
      password: this.state.password
    };
    this.setState({
      user: null,
      password: null,
      showAuthentication: false
    });
    this.context.pubsub.publish("event.credentialsObtained." + this._message.id, {
      id: this._message.id,
      data: res
    });
    delete this._message;
    this._processMessages();
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

Credentials.contextTypes = {
  pubsub: React.PropTypes.object
};

export default Credentials;
