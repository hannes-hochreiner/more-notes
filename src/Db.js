import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400} from 'material-ui/styles/colors';

class Db extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: this.props.db
    };
  }

  render() {
    let iconButtonElement = (
      <IconButton>
        <MoreVertIcon color={grey400}/>
      </IconButton>
    );

    let rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.editDb.bind(this)}>Edit</MenuItem>
        <MenuItem onTouchTap={this.syncDb.bind(this)}>Sync</MenuItem>
        <MenuItem onTouchTap={this.deleteDb.bind(this)}>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <ListItem
        primaryText={this.state.db.title}
        secondaryText={this.state.db.syncAddr}
        secondaryTextLines={1}
        rightIconButton={rightIconMenu}
      />
    );
  }

  editDb() {
    this.context.router.push("/dbs/" + this.state.db._id);
  }

  syncDb() {
    this.context.repo.syncDb(this.state.db);
  }

  deleteDb() {
    this.context.repo.deleteDb(this.state.db);
  }
}

Db.contextTypes = {
  router: React.PropTypes.object,
  repo: React.PropTypes.object
};


export default Db;
