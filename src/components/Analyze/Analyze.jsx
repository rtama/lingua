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
    return (
      <div className='analyze'>
        <div className='tools_list sidebar'>
          <ul>
            <li><Link to={`${this.props.match.url}/wordfrequency`}>Word Frequency</Link></li>
          </ul>
        </div>
        <div className='tool_container'>
          <div className='analyze_header'>
            <p className='analyze_user'>{this.state.user.firstName} {this.state.user.lastName}</p> 
          </div>
          <div className='tools'>
            <Route path='/analyze/:userid/wordfrequency' render={() => <WordFrequency {...this.props}></WordFrequency>} />
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