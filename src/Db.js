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
        <h1>{this.state.db.name}</h1>
        <h2>Sync Address</h2>
        <p>{this.state.db.syncAddr}</p>
        <ButtonGroup>
          <Button onClick={this.navNote.bind(this)}><Glyphicon glyph="pencil" /></Button>
        </ButtonGroup>
      </div>
    );
  }

  navNote() {
    this.context.router.push("/dbs/" + this.state.db._id);
  }
}

Db.contextTypes = {
  router: React.PropTypes.object
};


export default Db;
