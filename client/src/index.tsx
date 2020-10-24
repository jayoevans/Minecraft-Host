import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './index.css';
// import { Login } from "./components/login";
import {AlteredLogin} from "./components/altered-login";
import Navbar from "./components/navbar/navbar"
import { Portal } from "./components/portal";
import Account from './pages/account';


ReactDOM.render(
  <React.StrictMode>
    <AlteredLogin/>
  </React.StrictMode>,
  document.getElementById('root')
);
