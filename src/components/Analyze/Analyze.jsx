import React from 'react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import {
  Route,
  Link
} from 'react-router-dom';

// import child components
import WordFrequency from '../WordFrequency/WordFrequency';


// Main Analysis component 
class Analyze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    fetch('/api/user/' + this.props.match.params.userid).then((response) => {
      return response.json(); 
    }).then((response) => {
      this.setState({user: response});
    })
  }

  render(){
    const routes = [
      { path: '/analyze/:userid/wordfrequency',
        exact: true,
        component: WordFrequency
      }
    ]
    
    return (
      <div className='analyze'>
        <div className='tools_list'>
          <ul>
            <li><Link to={`${this.props.match.url}/wordfrequency`}>Word Frequency</Link></li>
          </ul>
        </div>
        <div className='tool_container'>
          <div className='analyze_header'>
            <p className='analyze_user'>{this.state.user.firstName} {this.state.user.lastName}</p> 
            <h1>{this.props.match.params.userid}</h1>
          </div>
          <div className='tools'>
            {routes.map((route, index) => (
              <Route 
                key={index}
                path={route.path}
                exact={route.exact}
                component={routes.component}
              /> 
            ))}
          </div>
        </div>
      </div>
    )
  }
}


Analyze.propTypes = {
  match: PropTypes.object
}

export default Analyze;