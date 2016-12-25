import React, { Component } from 'react';
import { default as PouchDb } from "pouchdb";
import { RepoPouchDb } from "./RepoPouchDb";

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
      repo: this.state.repo
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
  repo: React.PropTypes.object
};

export default AppContext;
