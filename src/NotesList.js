import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import Note from "./Note";

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    this.context.repo.getAllNotes().then((notes) => {
      this.setState({
        notes: notes
      });
    });
  }

  render() {
    return (
      <ListGroup className="NotesList">
        {this.state.notes.map((entry) => {
          return <Note key={entry.id} note={entry}></Note>;
        })}
      </ListGroup>
    );
  }
}

NotesList.contextTypes = {
  repo: React.PropTypes.object
};

export default NotesList;
