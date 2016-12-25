import React, { Component } from 'react';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

class Db extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      db: this.props.db
    };
  }

  render() {
    return (
      <div className="list-group-item">
        <h1>{this.state.db.title}</h1>
        <h2>Sync Address</h2>
        <p>{this.state.db.syncAddr}</p>
        <ButtonGroup bsStyle="default">
          <Button onClick={this.navNote.bind(this)}><Glyphicon glyph="pencil" /></Button>
          <Button onClick={this.sync.bind(this)}><Glyphicon glyph="cloud" /></Button>
        </ButtonGroup>
      </div>
    );
  }

  navNote() {
    this.context.router.push("/dbs/" + this.state.db._id);
  }

  sync() {
    this.context.repo.syncDb(this.state.db);
  }
}

Db.contextTypes = {
  router: React.PropTypes.object,
  repo: React.PropTypes.object
};


export default Db;
