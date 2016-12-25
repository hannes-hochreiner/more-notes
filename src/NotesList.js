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
    this.context.repo.getAllDbs().then((dbs) => {
      return Promise.all(dbs.map((db) => {
        return this.context.repo.getAllNotesFromDb(db).then((notesFromDb) => {
          return notesFromDb.map((note) => {
            return {
              db: db,
              note: note
            };
          });
        });
      }));
    }).then((noteArrays) => {
      this.setState({
        notes: noteArrays.reduce((curr, next) => {
          return curr.concat(next);
        }, [])
      });
    });
  }

  render() {
    return (
      <ListGroup className="NotesList">
        {this.state.notes.map((entry) => {
          return <Note key={entry.db._id + entry.note._id} note={entry}></Note>;
        })}
      </ListGroup>
    );
  }
}

NotesList.contextTypes = {
  repo: React.PropTypes.object
};

export default NotesList;
