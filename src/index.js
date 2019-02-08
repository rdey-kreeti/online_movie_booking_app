import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/adminDashboard" component={AdminDashboard}/>
    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
