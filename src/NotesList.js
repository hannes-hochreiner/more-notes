import React, { Component } from 'react';
import {List} from 'material-ui/List';
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
    }).then(() => {
      this.context.pubsub.subscribe("info.note.delete", this._onNoteDelete.bind(this));
    });
  }

  _onNoteDelete(topic, data) {
    this.setState({
      notes: this.state.notes.filter((elem) => {
        return !(elem.db._id === data.db._id && elem.note._id === data.note._id);
      })
    });
  }

  render() {
    return (
      <List>
        {this.state.notes.map((entry) => {
          return <Note key={entry.db._id + entry.note._id} note={entry}></Note>;
        })}
      </List>
    );
  }
}

NotesList.contextTypes = {
  pubsub: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default NotesList;
