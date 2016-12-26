import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="&gt; notes" onLeftIconButtonTouchTap={this.log.bind(this)}/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }

  goToNotes() {
    this.context.router.push("notesList");
  }

  addNote() {
    this.context.router.push("dbs/more-notes-db-0/notenew");
  }

  log() {
    console.log("test");
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default App;
