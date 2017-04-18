import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route, 
  Link
} from 'react-router-dom'

// Import components
import SidebarApp from './components/sidebar/sidebar';

ReactDOM.render(
    <SidebarApp></SidebarApp>,
    document.getElementById('app')
)