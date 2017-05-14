import React from 'react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import {
  Route,
  NavLink
} from 'react-router-dom';

// import child components
import WordFrequency from '../WordFrequency/WordFrequency';
import Followers from '../Followers/Followers'

// Main Analysis component 
class Analyze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    fetch('/api/user/' + this.props.match.params.userid).then((response) => {
      return response.json(); 
    }).then((response) => {
      this.setState({user: response});
    })
  }

  back() {
    this.props.history.push('/search')
  }

  render(){
    return (
      <div className='analyze'>
        <div className='tools_list sidebar'>
          <ul className='tools_header'>
            <li><NavLink to={'/'} activeClassName='tool_selected'>Lingua</NavLink></li>
          </ul>
          <ul>
            <li><NavLink to={`${this.props.match.url}/wordfrequency`} activeClassName='tool_selected'>Content</NavLink></li>
          </ul>
          <ul>
            <li><NavLink to={`${this.props.match.url}/followers`} activeClassName='tool_selected'>Followers</NavLink></li>
          </ul>
        </div>
        <div className='tool_container'>
          <div className='analyze_header'>
            <p className='analyze_user'>
              <i className="fa fa-chevron-left back" aria-hidden="true" onClick={this.back}></i>
              {this.state.user.firstName} {this.state.user.lastName}
            </p> 
          </div>
          <div className='tools'>
            <Route path='/analyze/:userid/wordfrequency' render={() => <WordFrequency {...this.props}></WordFrequency>} />
            <Route path='/analyze/:userid/followers' render={() => <Followers {...this.props}></Followers>} />
          </div>
        </div>
      </div>
    )
  }
}

Analyze.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}

export default Analyze;