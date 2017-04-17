import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';

// Import components
import Sidebar from './components/sidebar/sidebar';

ReactDOM.render(
    <Sidebar></Sidebar>,
    document.getElementById('app')
);