import React from 'react';
import PropTypes from 'prop-types';

// Component rendering the search bar over users
class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user_value: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.back = this.back.bind(this);
  }  

  handleChange(event) {
    this.setState({user_value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchSubmit(this.state.user_value);
  }

  back() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='search_users_form'>
        <div className='navbar'>
          <i className="fa fa-chevron-left back" aria-hidden="true" onClick={this.back}></i>
          <p id='search_header'>Who would you like to analyze?</p>
        </div>
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

SearchUsers.propTypes = {
  searchSubmit: PropTypes.func,
  history: PropTypes.object
}

export default SearchUsers;
