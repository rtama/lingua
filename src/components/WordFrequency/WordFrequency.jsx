import React from 'react';
import fetch from 'isomorphic-fetch';
import Route from 'react-router-dom';

// import child components
import Search from '../Search/Search';
import SearchResultsDisplay from '../SearchResultsDisplay/SearchResultsDisplay';

class WordFrequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showSearchResults: false,
      userValue: '',
      userResults: []
    }
    this.searchSubmit = this.searchSubmit.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  componentDidMount() {
    fetch('/api/').then((response) => {
      return response.json();
    }).then((response) => {
      this.setState({users: response});
    });
  }

  // Get results of userValue from search 
  getResults(userValue) {
    return this.state.users.filter((user) => {
      return (user.username.includes(userValue) || user.firstName.includes(userValue) || user.lastName.includes(userValue))
     });
  }

  // Callback for search component when form is submitted
  // Returns input for user search
  searchSubmit(userValue) {
    this.setState({userValue: userValue});
    console.log(userValue);
    console.log(this.state.users);
    console.log(this.getResults(userValue));
    this.setState({userResults: this.getResults(userValue)})
  }
   
  render() {
    let results = []
    this.state.userResults.forEach((user) => {
      results.push(
        <div key={user.id}>{user.firstName} {user.lastName}</div>
      )
    })

    return (
      <div className='analyze'>
        <Search searchSubmit={this.searchSubmit}></Search>
        
        <SearchResultsDisplay userValue={results}></SearchResultsDisplay>
      </div>
    )
  }
}

export default WordFrequency;