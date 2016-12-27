import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400} from 'material-ui/styles/colors';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryText: null,
      secondaryText: this.props.note.note.text,
      note: this.props.note
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
        <MenuItem onTouchTap={this.editNote.bind(this)}>Edit</MenuItem>
        <MenuItem onTouchTap={this.deleteNote.bind(this)}>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <ListItem
        primaryText={this.state.primaryText}
        secondaryText={this.state.secondaryText}
        secondaryTextLines={1}
        onTouchTap={this.toggleExpand.bind(this)}
        rightIconButton={rightIconMenu}
      />
    );
  }

  toggleExpand() {
    if (this.state.primaryText) {
      this.setState({
        primaryText: null,
        secondaryText: this.state.note.note.text
      });
    } else {
      this.setState({
        primaryText: this.state.note.note.text,
        secondaryText: null
      });
    }
  }

  editNote() {
    this.context.router.push("/dbs/" + this.state.note.db._id + "/notes/" + this.state.note.note._id);
  }

  deleteNote() {
    this.context.repo.deleteNoteFromDb(this.state.note.db, this.state.note.note).then(() => {
      this.context.pubsub.publish("info.note.delete." + this.state.note.note._id, this.state.note);
    });
  }
}

Note.contextTypes = {
  router: React.PropTypes.object,
  pubsub: React.PropTypes.object,
  repo: React.PropTypes.object
};


export default Note;
