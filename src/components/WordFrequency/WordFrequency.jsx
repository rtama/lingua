import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
import stopwords from 'stopwords'

// import child components 
import { Chart } from 'react-google-charts'

class WordFrequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prunedWordFrequencies: {},
      mostFrequent: [],
      selectedValue: 10
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    fetch('/api/pubs/user/' + this.props.match.params.userid).then((response) => {
      return response.json()
    }).then((response) => {
      let prunedWordFreq = getWordFreq(response)
      let kFreq = getKMostFreq(prunedWordFreq, 10)  
      this.setState({
        prunedWordFrequencies: prunedWordFreq,
        mostFrequent: kFreq,
      }) 
    })
  }

  handleChange(event) {
    console.log("event: ", event.target.value)
    this.setState({
      selectedValue: event.target.value,
      mostFrequent: getKMostFreq(this.state.prunedWordFrequencies, event.target.value)
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

    let options = []
    for (let i=5; i<21; i++) {
      if (i==10) {
        options.push(<option key={i} value={i}>{i}</option>)
      } else {
        options.push(<option key={i} value={i}>{i}</option>)       
      }
    }
    
    return (
      <div className='wordFrequencies'>
        <div>
          How many words would you like to view? 
          <select onChange={this.handleChange} value={this.state.selectedValue}>
            {options}
          </select>
        </div>
        <div>
          {this.state.mostFrequent.length>1 ? 
          <Chart
            chartType='BarChart'
            data={this.state.mostFrequent}
            graphId='BarChart'
            width={'400px'}
            height={'400px'}
            options={{
              title: `Top ${this.state.mostFrequent.length-1} Word Frequencies`,
              backgroundColor: '#FAFAFA'
            }}
          /> : <div></div>
          } 
        </div>
      </div>      
    )
  }
}

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
  let spliced = sorted.splice(0, k)  
  let wordArray = []
  wordArray.push(['Word', 'Frequency'])
  spliced.forEach((word) => {
    wordArray.push([word, wordDict[word]])   
  })
  return wordArray
  
}

// prop type declarations
WordFrequency.propTypes = {
  match: PropTypes.object
}

export default WordFrequency