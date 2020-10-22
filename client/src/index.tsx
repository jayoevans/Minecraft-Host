import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './index.css';
import { Login } from "./components/login";
import { Portal } from "./components/portal";
import Navbar from "./components/Navbar/navbar"
import NewWorld from './pages/newWorld';
import Account from './pages/account';


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Navbar/>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/home' exact component={Portal}/>
        <Route path='/newWorld' exact component={NewWorld}/>
        <Route path='/account' exact component={Account}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
