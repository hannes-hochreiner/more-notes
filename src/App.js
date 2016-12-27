import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import MnSnackbar from "./MnSnackbar";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  render() {
    let fabStyle = {
      position: "absolute",
      bottom: 20,
      right: 20
    };

    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="&gt; notes" onLeftIconButtonTouchTap={this.showMenu.bind(this)}/>
          <Drawer open={this.state.showMenu}>
            <MenuItem onTouchTap={this.goToDatabases.bind(this)}>Databases</MenuItem>
            <MenuItem onTouchTap={this.goToNotes.bind(this)}>Notes</MenuItem>
          </Drawer>
          {this.props.children}
          <FloatingActionButton style={fabStyle} onTouchTap={this.addNote.bind(this)}>
            <ContentAdd/>
          </FloatingActionButton>
          <MnSnackbar/>
        </div>
      </MuiThemeProvider>
    );
  }

  goToDatabases() {
    this.context.router.push("dbs");
    this.setState({
      showMenu: false
    });
  }

  goToNotes() {
    this.context.router.push("notesList");
    this.setState({
      showMenu: false
    });
  }

  addNote() {
    this.context.router.push("dbs/more-notes-db-0/notenew");
  }

  showMenu() {
    this.setState({
      showMenu: true
    });
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
  pubsub: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default App;
