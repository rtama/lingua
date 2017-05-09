import React from 'react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import {
  Route
} from 'react-router-dom';

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
  
  render() {
    return (
      <div className='analyze_header'>
        <p className='analyze_user'>{this.state.user.firstName} {this.state.user.lastName}</p> 
        <h1>{this.props.match.params.userid}</h1>
      </div>
    )
  }
}

Analyze.propTypes = {
  match: PropTypes.object
}

export default Analyze;