import React, { Component } from 'react';
import { Navbar, Nav, NavItem, SplitButton, MenuItem } from 'react-bootstrap';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#/">&gt; notes</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#/dbs">dbs</NavItem>
            <NavItem eventKey={2} href="#/dbnew">create db</NavItem>
          </Nav>
          <SplitButton title="notes" onClick={this.goToNotes.bind(this)}>
            <MenuItem onClick={this.addNote.bind(this)}>add note</MenuItem>
          </SplitButton>
        </Navbar>
        {this.props.children}
      </div>
    );
  }

  goToNotes() {
    this.context.router.push("notesList");
  }

  addNote() {
    this.context.router.push("dbs/more-notes-db-0/notenew");
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default App;
