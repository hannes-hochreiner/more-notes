import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, NoMatch } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import AppContext from './AppContext';
import App from './App';
import NotesList from './NotesList';
import NoteEdit from './NoteEdit';
import './index.css';

ReactDOM.render(
  <AppContext>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={NotesList}/>
        <Route path="notes/:noteId" component={NoteEdit}/>
        <Route path="noteslist" component={NotesList}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </AppContext>,
  document.getElementById('root')
);
