import React from 'react'
import fetch from 'isomorphic-fetch'
import PropTypes from 'prop-types'

class Connections extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstDegree:[]
    }
  }

  componentDidMount() {
    // fetch all connections for this user
    fetch('/api/connections/' + this.props.match.params.userid).then((response) => {
      return response.json()
    }).then((response) => {
      this.setState({
        firstDegree: response
      })
    })
  }

  render() {
    let firstCol = []
    if (this.state.firstDegree.length > 0) {
      this.state.firstDegree.forEach((user, index) => {
        if (user.firstName != 'undefined' && user.lastName != 'undefined') {
          firstCol.push(
            <div key={index} value={user.id}>{user.firstName} {user.lastName}</div>
          )   
        }
      })
    } 
    
    return (
      <div className='connections'>
        <div className='connections_col col-1'>
          {firstCol}
        </div>
        <div className='connections_col col-2'></div> 
        <div className='connections_col col-3'></div> 
      </div>
    )
  }
}

Connections.propTypes = {
  match: PropTypes.object,
  users: PropTypes.array
}

export default Connections