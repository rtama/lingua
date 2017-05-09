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
        <div className='heading'>
          <div className='title'>Lingua</div>
          <span>Dwell in the data or discover similar authors and publications</span>
          <div className='start-button'>Explore</div>
        </div>
        <div className='about' >
          <div className='pubpub_left' >
            This project was influenced by <a href="http://www.pubpub.org">PubPub</a>. Check it out!
          </div>
          <div className='pubpub_right' >
            <img src='../../../static/imgs/pubpublogo.png'/>
          </div>
        </div>
        <div>
        </div>
      </div>
    )

  }
}

export default Home;