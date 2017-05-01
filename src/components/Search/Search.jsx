import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user_value: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }  

  handleChange(event) {
    this.setState({user_value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchSubmit(this.state.user_value);
  }

  render() {
    // let users = []
    // this.props.users.forEach((user) => {
    //   users.push(
    //     <div key={user.id}>{user.firstName} {user.lastName}</div>
    //   )
    // })
    
    return (
      <div className='search_users_form'>
        <p id='search-header'>Who would you like to analyze?</p>
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text' 
            name='username' 
            size='50' 
            placeholder='Username or full name'
            onChange={this.handleChange}            
            />
        </form> 
      </div>
    )
  }
}

export default Search;
