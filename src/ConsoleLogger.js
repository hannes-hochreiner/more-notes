export default class ConsoleLogger {
  constructor(ps) {
    this._ps = ps;
    this._ps.subscribe("info", this._log.bind(this));
    this._ps.subscribe("error", this._log.bind(this));
    this._ps.subscribe("event", this._log.bind(this));
    this._ps.subscribe("action", this._log.bind(this));
  }

  _log(msg, data) {
    console.log(msg);
    console.log(data);
  }
}
