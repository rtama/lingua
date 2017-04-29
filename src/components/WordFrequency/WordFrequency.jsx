import React from 'react';
import fetch from 'isomorphic-fetch';


class WordFrequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: []}
  }

  componentDidMount() {
    fetch('/api/').then((response) => {
      return response.json();
    }).then((response) => {
      this.setState({users: response});
    });
  }

  render() {
    let users = []

    this.state.users.forEach((user) => {
      users.push(
        <div key={user.id}>{user.firstName} {user.lastName}</div>
      )
    })

    return (
    <h2>
      This is the message: {users}
    </h2>)
  }
}

export default WordFrequency;