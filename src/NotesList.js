import React, { Component } from 'react';
import {List} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Note from "./Note";

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    this._updateNotes().then(() => {
      this.context.pubsub.subscribe("info.note.delete", this._updateNotes.bind(this));
      this.context.pubsub.subscribe("info.db.sync", this._updateNotes.bind(this));
    });
  }

  _updateNotes() {
    return this.context.repo.getAllDbs().then((dbs) => {
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

  addNote() {
    this.context.router.push("dbs/more-notes-db-0/notenew");
  }

  render() {
    let fabStyle = {
      position: "absolute",
      bottom: 20,
      right: 20
    };

    return (
      <div>
        <List>
          {this.state.notes.map((entry) => {
            return <Note key={entry.db._id + entry.note._id} note={entry}></Note>;
          })}
        </List>
        <FloatingActionButton style={fabStyle} onTouchTap={this.addNote.bind(this)}>
          <ContentAdd/>
        </FloatingActionButton>
      </div>
    );
  }
}

NotesList.contextTypes = {
  router: React.PropTypes.object,
  pubsub: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default NotesList;
