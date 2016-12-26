import React from 'react';
import ReactDOM from 'react-dom';
import AppContext from "./AppTestContext";
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppContext>
      <App />
    </AppContext>
  , div);
});
