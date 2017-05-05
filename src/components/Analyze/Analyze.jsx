import React from 'react';
import PropTypes from 'prop-types';
import {
  Route
} from 'react-router-dom';

// Main Analysis component 
class Analyze extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return <h1>{this.props.match.params.userid}</h1>
  }
}

Analyze.propTypes = {
  match: PropTypes.object
}

export default Analyze;