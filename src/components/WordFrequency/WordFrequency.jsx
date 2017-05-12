import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'


/** 
 * Pruned word frequency dictionary (>1 occurence) 
 * 
 * @param {array<string>} wordsArray
 * @returns {object} 
*/
function getWordFreq(wordsArray) {
  let wordFreq = {}
  for (let i=0; i<wordsArray.length; i++) {
    let words = wordsArray[i].replace(/[^\s\w]/g, ' ').split(/\s+/g)
    for (let i=0; i<words.length; i++) {
      if(words[i] in wordFreq) {
        wordFreq[words[i]] += 1
      } else {
        wordFreq[words[i]] = 1
      }
    }
  }
  // prune out one count words
  let prunedWordFreq = {}
  let keys = Object.keys(wordFreq)
  keys.forEach((key) => {
    if (wordFreq[key] > 1) {
      prunedWordFreq[key] = wordFreq[key]
    } 
  })
  return prunedWordFreq
}

/**
 * Get the K most frequent words in the dictionary
 * 
 * @param {object} wordDict 
 * @param {integer} k
 * @returns {array}
 */
function getKMostFreq(wordDict, k) {
  
}

class WordFrequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordFrequencies: {}
    }
  }

  componentDidMount() {
    fetch('/api/pubs/user/' + this.props.match.params.userid).then((response) => {
      return response.json()
    }).then((response) => {
      let prunedWordFreq = getWordFreq(response)

      // let keys = Object.keys(prunedWordFreq) 
      // console.log("total length: ", keys.length)
      // this.setState({wordFrequencies: prunedWordFreq})
    })
  }

  render() {
    return (
      <div>
        <p>word frequency</p>
      </div>      
    )
  }
}

WordFrequency.propTypes = {
  match: PropTypes.object
}

export default WordFrequency