export class RepoPouchDb {
  constructor(pouchdb) {
    this._pdb = pouchdb;
  }

  init() {
    return this._pdb("more-notes-dbs").then((dbs) => {
      this._dbs = dbs;

      return this._dbs.getAllDocs({include_docs: true});
    }).then((res) => {
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
    return this._dbs.getAllDocs({include_docs: true}).then((res) => {
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
    return this._pdb(db._id).then((res) => {
      return res.getAllDocs({include_docs: true});
    }).then((res) => {
      return res.map((elem) => {
        return elem.doc;
      });
    });
  }

  getNoteFromDbById(db, id) {
    return this._pdb(db._id).then((res) => {
      return res.get(id);
    });
  }

  updateNoteInDb(db, note) {
    return this._pdb(db._id).then((res) => {
      return res.put(note);
    });
  }
}
