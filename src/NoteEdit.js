import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class NoteEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteId: this.props.params.noteId,
      dbId: this.props.params.dbId,
      db: null,
      note: null
    };
  }

  componentDidMount() {
    this.context.repo.getDbById(this.state.dbId).then((db) => {
      this.setState({
        db: db
      });

      if (!this.state.noteId) {
        return {};
      }

      return this.context.repo.getNoteFromDbById(db, this.state.noteId);
    }).then((note) => {
      this.setState({
        note: note
      });
    });
  }

  render() {
    return (
      <div>
        <TextField
          multiLine={true}
          id="textfield"
          value={this.state.note ? this.state.note.text : ""}
          onChange={this.handleChange.bind(this)}
          fullWidth={true}
        />
        <FlatButton
          label="save"
          primary={true}
          onTouchTap={this.save.bind(this)}
        />
      </div>
    );
  }

  handleChange(event) {
    let note = this.state.note;

    note.text = event.target.value;
    this.setState({note: note});
  }

  save() {
    this.context.repo.updateNoteInDb(this.state.db, this.state.note).then(() => {
      this.context.router.goBack();
    });
  }
}

NoteEdit.contextTypes = {
  router: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default NoteEdit;
