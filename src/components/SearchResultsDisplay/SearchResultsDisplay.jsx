import React from 'react';
import PropTypes from 'prop-types';

// Component for the display table of the search results over users
class SearchResultsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  // event handler for click on table row
  handleClick(user) {
    console.log("search results display props: ", this.props);
    this.props.history.push('/searchUser');
    console.log("user: ", user);
  }

  render() {
    let tableUsers = [];

    // only set headers if there is a result
    if (this.props.userResults.length > 0) {
      tableUsers.push(
        <tr key={0}>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>)
    }
    
    this.props.userResults.forEach((user) => {
      tableUsers.push(
        <SearchResultsDisplayItem key={user.id} user={user} handleClick={this.handleClick}>
        </SearchResultsDisplayItem> 
      )
    })

    return (
      <div className="table_wrapper">
        <table className="user_search_table"><tbody>{tableUsers}</tbody></table>
      </div>
    )
  }
}

// Split items of the display into own component to decrease render time
class SearchResultsDisplayItem extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this); 
  } 

  _onClick() {
    this.props.handleClick(this.props.user);
  }

  render() {
    return (
      <tr className='data_rows' onClick={this._onClick}>
        <td>{this.props.user.username}</td> 
        <td>{this.props.user.firstName}</td> 
        <td>{this.props.user.lastName}</td> 
      </tr>
    ) 
  }
}

// Proptypes for classes
SearchResultsDisplay.propTypes = {
  userResults: PropTypes.array,
  history: PropTypes.object
}

SearchResultsDisplayItem.propTypes = {
  user: PropTypes.object,
  handleClick: PropTypes.func
}

export {
  SearchResultsDisplay,
  SearchResultsDisplayItem
}