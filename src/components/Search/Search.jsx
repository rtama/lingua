import React from 'react';
import PropTypes from 'prop-types';

// Component rendering the search bar over users
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

Search.propTypes = {
  searchSubmit: PropTypes.func 
}

export default Search;
