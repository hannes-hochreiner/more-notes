import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

class DbEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbId: this.props.params.dbId,
      db: null
    };
  }

  componentDidMount() {
    this.context.repo.getDbById(this.state.dbId).then((db) => {
      this.setState({
        db: db
      });
    });
  }

  render() {
    return (
      <form>
        {this.state.dbId}
        <ButtonGroup>
          <Button onClick={this.save.bind(this)}><Glyphicon glyph="ok" /></Button>
        </ButtonGroup>
        <ControlLabel>Sync Address</ControlLabel>
        <FormGroup>
        <FormControl
          type="text"
          placeholder="Enter sync address"
          onChange={this.handleChange.bind(this)}
          value={this.state.db ? this.state.db.syncAddr : ""}
        />
        </FormGroup>
      </form>
    );
  }

  handleChange(event) {
    let db = this.state.db;

    db.syncAddr = event.target.value;
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
