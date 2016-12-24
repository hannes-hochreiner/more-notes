export class RepoMock {
  constructor() {
    this._notes = [
      { id: "1", _rev: "1", text: "note1" },
      { id: "2", _rev: "1", text: "note2" },
      { id: "3", _rev: "1", text: "note3" },
      { id: "4", _rev: "1", text: "note4" }
    ];
  }

  getAllNotes() {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(JSON.stringify(this._notes)));
    });
  }

  getNoteById(id) {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(JSON.stringify(this._notes.find((note) => {
        return note.id === id;
      }))));
    });
  }

  updateNote(note) {
    return new Promise((resolve, reject) => {
      let idx = this._notes.findIndex((nt) => {
        return note.id === nt.id;
      });

      this._notes.splice(idx, 1, note);
      resolve();
    });
  }
}
