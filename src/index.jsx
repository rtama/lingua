import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter
} from 'react-router-dom'

// Import components
import App from './components/App/App';

ReactDOM.render(
  <HashRouter>
    <App></App>
  </HashRouter>,
    document.getElementById('app')
)