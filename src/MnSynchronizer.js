import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

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
    this.context.pubsub.publish("info.debug.sync");
    this.setState({
      showAuthentication: true
    });
  }

  handleCancel() {
    this.context.pubsub.publish("info.debug.cancel");
    this.setState({
      showAuthentication: false
    });
  }

  handleOk() {
    this.context.pubsub.publish("info.debug.ok");
    this.setState({
      showAuthentication: false
    });
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
  pubsub: React.PropTypes.object
};

export default MnSynchronizer;
