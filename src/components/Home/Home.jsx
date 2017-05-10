import React from 'react';
import {
  Route, 
  Link
} from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='home_page'>
        <div className='landing'>
          <div className='title'>Lingua</div>
          <div className='subtitle'>Explore | Discover</div>
          <div className='button-container'>
            <div className='start-button'>Begin</div>
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

export default Home;