import React from 'react';
import PropTypes from 'prop-types';
import {
  Route
} from 'react-router-dom';



class AnalyzeUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>{this.props.match.params.userid}</h1>
  }
}

// class Analyze extends React.Component {
//   constructor(props) {
//     super(props);
//   } 

//   componentDidMount() {
//     // fetch('/api/')
//   }

//   render() {
//     <Route 
//       path={`${this.props.match.url}/:userid`},
//       component={}
//     />
//   }
// }

// const Analyze = ({ match }) => (
//     <Route 
//       path={`${match.url}/:userid`}
//       component={AnalyzeUser}
//     />
// )
class Analyze extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Route 
        path={`${this.props.match.url}/:userid`}
        component={AnalyzeUser}
      />
    )
  }
}

AnalyzeUser.propTypes = {
  match: PropTypes.object 
}

Analyze.propTypes = {
  match: PropTypes.object
}

export {
  AnalyzeUser,
  Analyze
}