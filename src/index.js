import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, NoMatch } from 'react-router';

import AppContext from './AppContext';
import App from './App';
import NotesList from './NotesList';
import DbsList from './DbsList';
import NoteEdit from './NoteEdit';
import DbEdit from './DbEdit';
import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <AppContext>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={NotesList}/>
        <Route path="dbs/:dbId/notes/:noteId" component={NoteEdit}/>
        <Route path="dbs/:dbId/notenew" component={NoteEdit}/>
        <Route path="noteslist" component={NotesList}/>
        <Route path="dbs" component={DbsList}/>
        <Route path="dbs/:dbId" component={DbEdit}/>
        <Route path="dbnew" component={DbEdit}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </AppContext>,
  document.getElementById('root')
);
