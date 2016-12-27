import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class NoteEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteId: this.props.params.noteId,
      dbId: this.props.params.dbId
    };
  }

  componentDidMount() {
    this.context.repo.getAllDbs().then((dbs) => {
      let db = dbs.find((d) => {
        return d._id = this.state.dbId;
      });

      if (!db) {
        db = dbs[0];
      }

      this.setState({
        dbs: dbs,
        db: db,
        newDb: JSON.parse(JSON.stringify(db))
      });

      if (!this.state.noteId) {
        return {};
      }

      return this.context.repo.getNoteFromDbById(db, this.state.noteId);
    }).then((note) => {
      this.setState({
        note: note,
        newNote: JSON.parse(JSON.stringify(note))
      });
    });
  }

  render() {
    return (
      <div>
        <SelectField
          value={this.state.newDb}
          floatingLabelText="Database"
          onChange={this.onDbChange.bind(this)}
        >
          {this.state.dbs ? this.state.dbs.map((db, idx) => {
            return (
              <MenuItem key={idx} value={db} primaryText={db.title} />
            );
          }) : ""}
        </SelectField>
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

  onDbChange(event, index, value) {
    this.setState({
      newDb: value
    });
  }

  handleChange(event) {
    let note = this.state.newNote;

    note.text = event.target.value;
    this.setState({newNote: note});
  }

  save() {
    let newNote = this.state.newNote;

    if (this.state.db && this.state.db._id !== this.state.newDb._id) {
      delete newNote._id;
      delete newNote._rev;
    }

    this.context.repo.updateNoteInDb(this.state.newDb, newNote).then(() => {
      if (this.state.db && this.state.db._id !== this.state.newDb._id) {
        return this.context.repo.deleteNoteFromDb(this.state.db, this.state.note);
      }

      return;
    }).then(() => {
      this.context.router.goBack();
    });
  }
}

NoteEdit.contextTypes = {
  router: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default NoteEdit;
