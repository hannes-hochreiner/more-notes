export class RepoPouchDb {
  constructor(pouchdb) {
    this._pdb = pouchdb;
  }

  init() {
    this._dbs = new this._pdb("more-notes-dbs");

    return this._dbs.allDocs({include_docs: true}).then((res) => {
      if (res.rows.length > 0) {
        return;
      }

      return this._dbs.put({
        _id: "more-notes-db-0",
        title: "local",
        type: "db"
      });
    });
  }

  getAllDbs() {
    return this._dbs.allDocs({include_docs: true}).then((res) => {
      return res.map((elem) => {
        return elem.doc;
      });
    });
  }

  getDbById(dbId) {
    return this._dbs.get(dbId);
  }

  updateDb(db) {
    return this._dbs.put(db);
  }

  getAllNotesFromDb(db) {
    let d = new this._pdb(db._id);

    return d.allDocs({include_docs: true}).then((res) => {
      return res.map((elem) => {
        return elem.doc;
      });
    });
  }

  getNoteFromDbById(db, id) {
    let d = new this._pdb(db._id);

    return d.get(id);
  }

  updateNoteInDb(db, note) {
    let d = new this._pdb(db._id);

    return d.put(note);
  }
}
