import React from 'react';
import ReactDOM from 'react-dom';
import AppContext from "./AppTestContext";
import Db from './Db';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppContext>
      <Db/>
    </AppContext>
  , div);
});
