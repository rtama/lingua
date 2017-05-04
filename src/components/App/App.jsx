import React from 'react'
import {
  Route, 
  Link
} from 'react-router-dom'

// Import child components
import AnalyzeSearch from '../AnalyzeSearch/AnalyzeSearch';

// Iterable array of routes that the sidebar can contain
const routes = [
  { path: '/',
    exact: true,
    main: () => <h2>Home</h2>
  },
  { path: '/Analyze',
    main: AnalyzeSearch 
  },
  { path: '/Compare', 
    main: () => <h2>Compare</h2>
  }
]

const App = () => (
  <div className='container'>
    <div className='sidebar'>
      <header>Lingua</header>
      <ul>
        <li><Link to='/' >Home</Link></li>
        <li><Link to='/Analyze' >Analyze</Link></li>
        <li><Link to='/Compare' >Compare</Link></li>
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

export default App
