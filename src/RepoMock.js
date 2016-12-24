export class RepoMock {
  constructor() {
    this._dbs = [
      { id: "1", _rev: "1", name: "private", syncAddr: "" },
      { id: "2", _rev: "1", name: "public", syncAddr: "https://testdomain.test" }
    ];

    this._notes = [
      { note: { id: "1", _rev: "1", text: "note1" }, dbId: "1" },
      { note: { id: "1", _rev: "1", text: "note2" }, dbId: "2" },
      { note: { id: "2", _rev: "1", text: "note3" }, dbId: "2" },
      { note: { id: "2", _rev: "1", text: "note4" }, dbId: "1" }
    ];
  }

  getAllDbs() {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(JSON.stringify(this._dbs)));
    });
  }

  getDbById(dbId) {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(JSON.stringify(this._dbs.find((db) => {
        return db.id === dbId;
      }))));
    });
  }

  updateDb(db) {
    return new Promise((resolve, reject) => {
      let idx = this._dbs.findIndex((elem) => {
        return elem.id === db.id;
      });

      this._dbs.splice(idx, 1, db);
      resolve();
    });
  }

  getAllNotes() {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(JSON.stringify(this._notes)));
    });
  }

  getNoteByDbIdId(dbId, id) {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(JSON.stringify(this._notes.find((note) => {
        return note.note.id === id && note.dbId === dbId;
      }))));
    });
  }

  updateNote(note) {
    return new Promise((resolve, reject) => {
      let idx = this._notes.findIndex((nt) => {
        return note.note.id === nt.note.id && note.dbId === nt.dbId;
      });

      this._notes.splice(idx, 1, note);
      resolve();
    });
  }
}
