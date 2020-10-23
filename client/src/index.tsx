import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './index.css';
// import { Login } from "./components/login";
import {AlteredLogin} from "./components/alteredLogin";
import Navbar from "./components/Navbar/navbar"
import { Portal } from "./components/portal";
import Account from './pages/account';


ReactDOM.render(
  <React.StrictMode>
    <AlteredLogin/>
  </React.StrictMode>,
  document.getElementById('root')
);
