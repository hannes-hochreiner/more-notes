import React from 'react';
import ReactDOM from 'react-dom';
import AppContext from "./AppTestContext";
import DbEdit from './DbEdit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppContext>
      <DbEdit dbId="db1"/>
    </AppContext>
  , div);
});
