import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
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
            <NavItem eventKey={2} href="#/noteslist">notes</NavItem>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

export default App;
