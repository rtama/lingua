import React from 'react';
import PropTypes from 'prop-types';
import {
  Route, 
  Link
} from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // on begin button click send to search component
  handleClick() {
    this.props.history.push('/search');
  }

  render() {
    return (
      <div className='home_page'>
        <div className='landing'>
          <div className='title'>Lingua</div>
          <div className='subtitle'>Explore | Discover</div>
          <div className='button-container'>
            <div className='start-button' onClick={this.handleClick}>Begin <i className="fa fa-chevron-right" aria-hidden="true"></i></div>
          </div>
        </div>
        
        <div className='about' >
          <div className='pubpub_left' >
            This project was influenced by <a href="http://www.pubpub.org">PubPub</a>. Check it out!
          </div>
          <div className='pubpub_right' >
            <img src='../../../static/imgs/pubpublogo.png'/>
          </div>
        </div>
        
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object
}

export default Home;