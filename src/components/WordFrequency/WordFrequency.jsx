import React from 'react';
import fetch from 'isomorphic-fetch';


class WordFrequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    fetch('/api/').then((response) => {
      return response.json();
    }).then((response) => {
      this.setState(response);
    });
  }

  render() {
    return (
    <h2>
      This is the message: {this.state.message}
    </h2>)
  }
}

export default WordFrequency;