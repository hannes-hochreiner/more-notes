import React, { Component } from 'react';
import { RepoMock } from "./RepoMock";

class AppContext extends Component {
  getChildContext() {
    return {
      repo: new RepoMock()
    };
  }

  render() {
    return this.props.children;
  }
}

AppContext.childContextTypes = {
  repo: React.PropTypes.object
};

export default AppContext;
