import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter
} from 'react-router-dom'

// Import components
import App from './components/App/App';

ReactDOM.render(
  // <HashRouter>
  <BrowserRouter>
    <App></App>
  </BrowserRouter>,
  // </HashRouter>,
    document.getElementById('app')
)