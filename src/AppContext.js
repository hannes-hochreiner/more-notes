import React, { Component } from 'react';
import { default as PouchDb } from "pouchdb";
import { default as PubSub } from "pubsub-js";
import { RepoPouchDb } from "./RepoPouchDb";
import { v4 as uuid } from "uuid";

class AppContext extends Component {
  constructor(props) {
    super(props);

    let repo = new RepoPouchDb(PouchDb);

    this.state = {
      repo: repo,
      initialized: false
    };

    repo.init().then(() => {
      this.setState({
        initialized: true
      });
    });
  }

  getChildContext() {
    return {
      repo: this.state.repo,
      pubsub: PubSub,
      uuid: uuid
    };
  }

  render() {
    if (!this.state.initialized) {
      return <h1>initializing</h1>;
    }

    return this.props.children;
  }
}

AppContext.childContextTypes = {
  repo: React.PropTypes.object,
  uuid: React.PropTypes.func,
  pubsub: React.PropTypes.object
};

export default AppContext;
