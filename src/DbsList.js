import React, { Component } from 'react';
import {List} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Db from "./Db";

class DbsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbs: []
    };
  }

  componentDidMount() {
    this._updateDbList().then(() => {
      this.context.pubsub.subscribe("info.db", this._updateDbList.bind(this));
    });
  }

  _updateDbList() {
    return this.context.repo.getAllDbs().then((dbs) => {
      this.setState({
        dbs: dbs
      });
    });
  }

  addDb() {
    this.context.router.push("dbnew");
  }

  render() {
    let fabStyle = {
      position: "absolute",
      bottom: 20,
      right: 20
    };

    return (
      <div>
        <List>
          {this.state.dbs.map((entry) => {
            return <Db key={entry._id} db={entry}></Db>;
          })}
        </List>
        <FloatingActionButton style={fabStyle} onTouchTap={this.addDb.bind(this)}>
          <ContentAdd/>
        </FloatingActionButton>
      </div>
    );
  }
}

DbsList.contextTypes = {
  router: React.PropTypes.object,
  pubsub: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default DbsList;
