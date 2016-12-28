import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class DbEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dbId: this.props.params ? this.props.params.dbId : this.props.dbId,
      db: null
    };
  }

  componentDidMount() {
    if (!this.state.dbId) {
      this.setState({
        db: {}
      });

      return;
    }

    this.context.repo.getDbById(this.state.dbId).then((db) => {
      this.setState({
        db: db
      });
    });
  }

  render() {
    return (
      <div>
        <TextField
          id="titleField"
          floatingLabelText="Title"
          value={this.state.db ? this.state.db.title : ""}
          onChange={this.handleChange.bind(this, "title")}
          fullWidth={true}
        />
        <TextField
          id="syncAddrField"
          floatingLabelText="Synchronization Address"
          value={this.state.db ? this.state.db.syncAddr : ""}
          onChange={this.handleChange.bind(this, "syncAddr")}
          fullWidth={true}
        />
        <TextField
          id="authAddrField"
          floatingLabelText="Authorization Address"
          value={this.state.db ? this.state.db.authAddr : ""}
          onChange={this.handleChange.bind(this, "authAddr")}
          fullWidth={true}
        />
        <FlatButton
          label="save"
          primary={true}
          onTouchTap={this.save.bind(this)}
        />
      </div>
    );
  }

  handleChange(field, event) {
    let db = this.state.db;

    db[field] = event.target.value;
    this.setState({db: db});
  }

  save() {
    this.context.repo.updateDb(this.state.db).then(() => {
      this.context.router.goBack();
    });
  }
}

DbEdit.contextTypes = {
  router: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default DbEdit;
