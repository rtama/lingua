import React from 'react'
import fetch from 'isomorphic-fetch'
import PropTypes from 'prop-types'

class Connections extends React.Component {
  constructor(props) {   super(props)
    this.state = {
      firstDegree:[],
      secondDegree: [],
      thirdDegree: [],
      emptyUser: [{
        id: -1,
        firstName: 'No users found :(', 
        lastName: ''
      }]
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    // fetch all connections for this user
    fetch('/api/connections/' + this.props.match.params.userid).then((response) => {
      return response.json()
    }).then((response) => {
      let filteredResponse = response.filter((user) => {
        return user.firstName != 'undefined' && user.lastName != 'undefined'
      }) 
      this.setState({
        firstDegree: filteredResponse
      })
    })
  }

  // handle click on child connections column and render new column
  handleClick(userid, column) {
    if (column == 1) {
      fetch('/api/connections/' + userid).then((response) => {
        return response.json()
      }).then((response) => {
        let filteredResponse = response.filter((user) => {
          let notUndefined = user.firstName != 'undefined' && user.lastName != 'undefined'
          
          // make sure this user isn't in previous degree
          let notRepeated = true 
          for (let i=0; i<this.state.firstDegree.length; i++) {
            if (this.state.firstDegree[i].id == user.id) {
              notRepeated = false 
            }
          }          
          return notUndefined && notRepeated
        }) 

        // in empty case
        if (filteredResponse.length == 0) {
          filteredResponse = this.state.emptyUser
        }

        this.setState({
          secondDegree: filteredResponse,
          thirdDegree: []
        })
      })
    } else if (column == 2) {
      fetch('/api/connections/' + userid).then((response) => {
        return response.json()
      }).then((response) => {
        let filteredResponse = response.filter((user) => {
          let notUndefined = user.firstName != 'undefined' && user.lastName != 'undefined'
          
          // make sure this user isn't in previous degree
          let notRepeated = true 
          for (let i=0; i<this.state.firstDegree.length; i++) {
            if (this.state.firstDegree[i].id == user.id) {
              notRepeated = false 
            }
          }          
          for (let i=0; i<this.state.secondDegree.length; i++) {
            if (this.state.secondDegree[i].id == user.id) {
              notRepeated = false 
            }
          }          
          return notUndefined && notRepeated
        }) 
        
        // in empty case
        if (filteredResponse.length == 0) {
          filteredResponse = this.state.emptyUser
        }
        this.setState({
          thirdDegree: filteredResponse
        })
      })
    }
  }

  render() {
    return (
      <div className='connections'>
        <div className='connections_col col-1'>
          <table className='connections_table'> 
            <ConnectionsColumn
              connections={this.state.firstDegree} 
              column={1}
              handleClick={this.handleClick}
            ></ConnectionsColumn>
          </table>
        </div>
        <div className='connections_col col-2'>
          <table className='connections_table'> 
            <ConnectionsColumn
              connections={this.state.secondDegree} 
              column={2}
              handleClick={this.handleClick}
            ></ConnectionsColumn>
          </table>
        </div> 
        <div className='connections_col col-3'>
          <table className='connections_table'> 
            <ConnectionsColumn
              connections={this.state.thirdDegree} 
              column={3}
              handleClick={this.handleClick}
            ></ConnectionsColumn>
          </table>
        </div> 
      </div>
    )
  }
}

// column component for connections
class ConnectionsColumn extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(event) {
    // console.log(event.currentTarget.getAttribute('data-item'))
    this.props.handleClick(event.currentTarget.getAttribute('data-item'), this.props.column)
  }

  render() {
    let connections = []
    // push header
    connections.push(
      <tr key={0}>
        <th>{this.props.column} Degree(s)</th>
      </tr>
    )
    // push rest of data
    this.props.connections.forEach((user, index) => {
      connections.push(
        <tr key={user.id} data-item={user.id} onClick={this.onClick}>
          <td>{user.firstName} {user.lastName}</td> 
        </tr>
      ) 
    })
    
    return (
      <tbody>
        {connections}
      </tbody>
    )
  }
}


Connections.propTypes = {
  match: PropTypes.object,
  users: PropTypes.array
}

ConnectionsColumn.propTypes = {
  connections: PropTypes.array,
  handleClick: PropTypes.func,
  column: PropTypes.number
}

export {
  Connections,
  ConnectionsColumn
}