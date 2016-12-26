import React, { Component } from 'react';
import {List} from 'material-ui/List';
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
      <List>
        {this.state.dbs.map((entry) => {
          return <Db key={entry._id} db={entry}></Db>;
        })}
      </List>
    );
  }
}

DbsList.contextTypes = {
  repo: React.PropTypes.object
};

export default DbsList;
