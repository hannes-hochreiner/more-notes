import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import MnSnackbar from "./MnSnackbar";

import Xhr from "./Xhr";
import Synchronizer from "./Synchronizer";
import Credentials from "./Credentials";
import ConsoleLogger from "./ConsoleLogger";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      dbs: []
    };
  }

  componentDidMount() {
    this._xhr = new Xhr(XMLHttpRequest, this.context.pubsub);
    this._logger = new ConsoleLogger(this.context.pubsub);
    this._sync = new Synchronizer(this.context.repo, this.context.pubsub, this.context.uuid);
    this.context.repo.getAllDbs().then((dbs) => {
      this.setState({
        dbs: dbs
      });
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="more notes"
            onLeftIconButtonTouchTap={this.showMenu.bind(this)}
            iconElementRight={<FlatButton label="Sync" />}
            onRightIconButtonTouchTap={this.syncAll.bind(this)}
          />
          <Drawer open={this.state.showMenu}>
            <MenuItem onTouchTap={this.goToDatabases.bind(this)}>Databases</MenuItem>
            <MenuItem onTouchTap={this.goToNotes.bind(this)}>Notes</MenuItem>
          </Drawer>
          {this.props.children}
          <MnSnackbar/>
          <Credentials/>
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

  showMenu() {
    this.setState({
      showMenu: true
    });
  }

  syncAll() {
    this.context.repo.getAllDbs().then((dbs) => {
      dbs.map((db) => {
        this.context.pubsub.publish("action.syncDb", {
          id: this.context.uuid(),
          db: db
        });
      });
    });
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
  pubsub: React.PropTypes.object,
  repo: React.PropTypes.object,
  uuid: React.PropTypes.func
};

export default App;
