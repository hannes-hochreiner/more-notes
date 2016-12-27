import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

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
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="&gt; notes"
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
      return Promise.all(dbs.filer((db) => {
        return db.syncAddr && db.syncAddr !== "";
      }).map((db) => {
        return this.context.repo.syncDb(db).then(() => {
          this.context.pubsub.publish("info.db.sync." + db._id, db);
        }).catch((err) => {
          this.context.pubsub.publish("error.db.sync." + db._id, err);
        });
      }));
    });
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
  pubsub: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default App;
