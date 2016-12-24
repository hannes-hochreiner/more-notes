import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import Db from "./Db";

class DbsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbs: []
    };
  }

  componentDidMount() {
    this.context.repo.getAllDbs().then((dbs) => {
      this.setState({
        dbs: dbs
      });
    });
  }

  render() {
    return (
      <ListGroup className="DbsList">
        {this.state.dbs.map((entry) => {
          return <Db key={entry.id} db={entry}></Db>;
        })}
      </ListGroup>
    );
  }
}

DbsList.contextTypes = {
  repo: React.PropTypes.object
};

export default DbsList;
