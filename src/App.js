import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>more notes</h2>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
