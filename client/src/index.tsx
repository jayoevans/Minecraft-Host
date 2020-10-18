import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Login } from "./components/login";
import { Portal } from "./components/portal";

ReactDOM.render(
  <React.StrictMode>
    {/* <Login /> */}
    <Portal />
  </React.StrictMode>,
  document.getElementById('root')
);
