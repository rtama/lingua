import React from 'react'
import {
  BrowserRouter as Router,
  Route, 
  Link
} from 'react-router-dom'

// Iterable array of routes that the sidebar can contain
const routes = [
  { path: '/',
    exact: true,
    main: () => <h2>Home</h2>
  },
  { path: '/Analyze',
    main: () => <h2>Analyze</h2>
  },
  { path: '/Compare', 
    main: () => <h2>Compare</h2>
  }
]

const SidebarApp = () => (
  <Router>
    <div>
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/Analyze'>Analyze</Link></li>
          <li><Link to='/Compare'>Compare</Link></li>
        </ul>
      </div>

      <div>
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
  </Router>
)

export default SidebarApp
