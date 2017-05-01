import React from 'react';


class SearchResultsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }


  // event handler for click on table row
  handleClick(user) {
    console.log("handler")      
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
        <tr key={user.id} className='data_rows' onClick={this.handleClick(user)}>
          <td>{user.username}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
        </tr>
      ) 
    })
    
    return (
      <div className="table_wrapper">
        <table className="user_search_table"><tbody>{tableUsers}</tbody></table>
      </div>
    )
  }
}


export default SearchResultsDisplay;