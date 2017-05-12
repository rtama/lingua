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
            <div className='start-button' onClick={this.handleClick}>Begin</div>
          </div>
          <div className='scroll_down'>
            <i className="fa fa-angle-double-down" aria-hidden="true"></i>
          </div>
        </div>
        
        <div className='about' >
          <div className='pubpub_left' >
            <div>
              <div className='description_top'>This project gets it's data from PubPub <a href="http://www.pubpub.org">Check it out!</a></div>
              <div className='description_bottom'>PubPub is a free and open tool for collaborative editing, instant publishing,
               continuous review, and grassroots journals</div>
            </div>
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