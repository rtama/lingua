import React from 'react';
import fetch from 'isomorphic-fetch';
import  {
  Route
} from 'react-router-dom';

// import child components
import SearchUsers from '../SearchUsers/SearchUsers';
import { SearchResultsDisplay } from '../SearchResultsDisplay/SearchResultsDisplay';

class AnalyzeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
  // Match if searchValue is within username or concatenated fullname
  getResults(userValue) {
    let concatValue = userValue.replace(/\s/g, "").toLowerCase();
    if (concatValue.length == 0) {return []}
    return this.state.users.filter((user) => {
      let fullName = (user.firstName + user.lastName).toLowerCase();
      return user.username.includes(concatValue) || fullName.includes(concatValue)
     });
  }

  // Callback for search component when form is submitted
  // Returns input for user search
  searchSubmit(userValue) {
    this.setState({
        userValue: userValue,
        userResults: this.getResults(userValue)
      });
  }
   
  render() {
    return (
      <div className='search'>
        <Route path='/search' render={() => <SearchUsers {...this.props} searchSubmit={this.searchSubmit}></SearchUsers>} />
        <Route path='/search' render={() => <SearchResultsDisplay {...this.props} userResults={this.state.userResults}></SearchResultsDisplay> }/>
      </div>
    )
  }
}
        
export default AnalyzeSearch;