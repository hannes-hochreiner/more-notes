import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

class MnSnackbar extends Component {
  constructor(props) {
    super(props);

    this._messages = [];

    this.state = {
      showMessage: false,
      message: null
    };
  }

  componentDidMount() {
    this.context.pubsub.subscribe("info", this.queueMessage.bind(this));
    this.context.pubsub.subscribe("error", this.queueMessage.bind(this));
  }

  queueMessage(topic, data) {
    this._messages.push(topic);

    if (!this.state.showMessage) {
      this._showNextMessage();
    }
  }

  _showNextMessage() {
    if (this._messages.length > 0) {
      this.setState({
        showMessage: true,
        message: this._messages.shift()
      });

      setTimeout(this._showNextMessage.bind(this), 3000);
    } else {
      this.setState({
        showMessage: false
      });
    }
  }

  render() {
    return (
      <Snackbar
        open={this.state.showMessage}
        message={this.state.message || ""}
      />
    );
  }
}

MnSnackbar.contextTypes = {
  pubsub: React.PropTypes.object
};

export default MnSnackbar;
