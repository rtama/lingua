import React from 'react';
import fetch from 'isomorphic-fetch';
import Route from 'react-router-dom';

// import child components
import Search from '../Search/Search';


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

  searchSubmit(user_value) {
    console.log(user_value);
  }
   
  render() {
    let users = []
    this.state.users.forEach((user) => {
      users.push(
        <div key={user.id}>{user.firstName} {user.lastName}</div>
      )
    })

    return (
      <div className='analyze'>
        <Search searchSubmit={this.searchSubmit}></Search>
      </div>
    )
  }
}

export default WordFrequency;