import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'

class WordFrequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordFrequencies: {}
    }
  }

  componentDidMount() {
    fetch('/api/pubs/user/' + this.props.match.params.userid).then((response) => {
      return response
    }).then((response) => {
      let wordFreq = {}
      for (let i=0; i<response.length; i++) {
        let words = response[i].replace(/[^\s\w]/g, ' ').split(/\s+/g)
        for (let i=0; i<words.length; i++) {
          if(words[i] in wordFreq) {
            wordFreq[words[i]] += 1
          } else {
            wordFreq[words[i]] = 1
          }
        }
      } 
      this.setState({wordFrequencies: wordFreq})
    })
  }

  render() {
    return (
      <div>words{this.state.wordFrequencies}</div>
    )
  }
}

WordFrequency.propTypes = {
  match: PropTypes.object
}

export default WordFrequency