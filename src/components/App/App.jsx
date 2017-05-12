import React from 'react';
import {
  Route, 
  Link
} from 'react-router-dom';

// Import child components
import Search from '../Search/Search';
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
    main: Search
  },
  {
    path: '/analyze/:userid',
    exact: false,
    main: Analyze 
  }
]

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
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
    )
  }
}

export default App;
