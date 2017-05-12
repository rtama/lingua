import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
import stopwords from 'stopwords'

/** 
 * Pruned word frequency dictionary (>1 occurence) and reduce stopwords
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
  let keys= Object.keys(wordFreq)
  keys.forEach((key) => {
    if (wordFreq[key] > 1 && key != "" && !(stopwords.english.includes(key))) {
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
  let keys = Object.keys(wordDict)
  let sorted = keys.sort((a, b) => {
    return wordDict[b] - wordDict[a]
  })
  return sorted.splice(0, k)  
}

class WordFrequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prunedWordFrequencies: {},
      mostFrequent: []
    }
  }

  componentDidMount() {
    fetch('/api/pubs/user/' + this.props.match.params.userid).then((response) => {
      return response.json()
    }).then((response) => {
      let prunedWordFreq = getWordFreq(response)
      let kFreq = getKMostFreq(prunedWordFreq, 10)  
      this.setState({
        prunedWordFrequencies: prunedWordFreq,
        mostFrequent: kFreq 
      }) 
    })
  }

  render() {
    let wordFrequencies = []
    if (this.state.mostFrequent.length > 0) {
      this.state.mostFrequent.forEach((word, index) => {
        wordFrequencies.push(
          <div key={index}>{word}: {this.state.prunedWordFrequencies[word]}</div>
        )
      })
    }

    return (
      <div className='wordFrequencies'>
        {wordFrequencies}
      </div>      
    )
  }
}

WordFrequency.propTypes = {
  match: PropTypes.object
}

export default WordFrequency