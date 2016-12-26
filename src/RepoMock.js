export class RepoMock {
  constructor() {
    this._dbs = [
      { _id: "db1", _rev: "1", title: "private", syncAddr: "" },
      { _id: "db2", _rev: "1", title: "public", syncAddr: "https://testdomain.test" }
    ];

    this._db1 = [
      { _id: "1", _rev: "1", text: "note1" },
      { _id: "2", _rev: "1", text: "note4" }
    ];

    this._db2 = [
      { _id: "1", _rev: "1", text: "note2" },
      { _id: "2", _rev: "1", text: "note3" }
    ];
  }

  init() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  getAllDbs() {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(JSON.stringify(this._dbs)));
    });
  }

  getDbById(dbId) {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(JSON.stringify(this._dbs.find((db) => {
        return db._id === dbId;
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

  getAllNotesFromDb(db) {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(JSON.stringify(this["_" + db._id])));
    });
  }

  getNoteFromDbById(db, id) {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(JSON.stringify(this["_" + db._id].find((note) => {
        return note._id === id;
      }))));
    });
  }

  updateNoteInDb(db, note) {
    return new Promise((resolve, reject) => {
      let idx = this["_" + db._id].findIndex((nt) => {
        return note._id === nt._id;
      });

      this["_" + db._id].splice(idx, 1, note);
      resolve();
    });
  }
}
