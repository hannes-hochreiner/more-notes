import React, { Component } from 'react';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

class NoteEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
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
      return this.context.repo.getNoteFromDbById(db, this.state.noteId);
    }).then((note) => {
      this.setState({
        note: note
      });
    });
  }

  render() {
    let textarea = null;

    if (this.state.note) {
      textarea = <textarea value={this.state.note.text} onChange={this.handleChange.bind(this)}/>;
    } else {
      textarea = <textarea value="" onChange={this.handleChange.bind(this)}/>;
    }

    return (
      <div>
        {this.state.noteId}
        <ButtonGroup>
          <Button onClick={this.save.bind(this)}><Glyphicon glyph="ok" /></Button>
        </ButtonGroup>
        {textarea}
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
