import React from 'react';
import {
  Route, 
  Link
} from 'react-router-dom';

// Import child components
import AnalyzeSearch from '../AnalyzeSearch/AnalyzeSearch';
import Analyze from '../Analyze/Analyze';
import Home from '../Home/Home';

// Iterable array of routes that the sidebar can contain
const routes = [
  { path: '/',
    exact: true,
    main: Home
  },
  { path: '/search',
    exact: true,
    main: AnalyzeSearch
  },
  {
    path: '/analyze/:userid',
    exact: false,
    main: Analyze 
  }
]

const App = () => (
  <div className='container'>
    <div className='sidebar'>
      <header>Lingua</header>
      <ul>
        <li><Link to='/' >Home</Link></li>
        <li><Link to='/search' >Analyze</Link></li>
      </ul>
    </div>

    <div className='main'>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
          />
      ))}
    </div>
  </div>
)

export default App;
