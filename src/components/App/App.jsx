import React from 'react'
import {
  Route, 
  Link
} from 'react-router-dom'

// Import child components
import WordFrequency from '../WordFrequency/WordFrequency'

// Declare styles and include at end
let styles;

// Iterable array of routes that the sidebar can contain
const routes = [
  { path: '/',
    exact: true,
    main: () => <h2>Home</h2>
  },
  { path: '/Analyze',
    main: WordFrequency
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
        <li><Link to='/' replace>Home</Link></li>
        <li><Link to='/Analyze' replace>Analyze</Link></li>
        <li><Link to='/Compare' replace>Compare</Link></li>
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
