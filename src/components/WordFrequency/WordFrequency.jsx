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
      mostFrequentWords: [],
      selectedValue: 10,
      totalWords: 0,
      onceWordsCount: 0,
      stopWordsCount: 0,
      longestWord: "",
      frequentWordCount: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

    // 'pruned': prunedWordFreq,
    // 'onceWords': onceWords,
    // 'stopWords': stopWords,
    // 'totalCount': totalCount,
    // 'longestWord': longestWord
    
    // 'wordArray': wordArray,
    // 'freqCount': count
    
  componentDidMount() {
    fetch('/api/pubs/user/' + this.props.match.params.userid).then((response) => {
      return response.json()
    }).then((response) => {
      let wordStats = getWordFreq(response)
      let freqStats = getKMostFreq(wordStats.pruned, 10)  
      console.log("wordStats: ", wordStats)
      console.log("freqStats: ", freqStats)
      this.setState({
        prunedWordFrequencies: wordStats.pruned,
        mostFrequentWords: freqStats.wordArray,
        totalWords: wordStats.totalCount,
        onceWordsCount: wordStats.onceWords,
        stopWordsCount: wordStats.stopWords,
        longestWord: wordStats.longestWord,
        frequentWordCount: freqStats.freqCount
      }) 
    })
  }

  handleChange(event) {
    let freqStats = getKMostFreq(this.state.prunedWordFrequencies, event.target.value)
    this.setState({
      selectedValue: event.target.value,
      mostFrequentWords: freqStats.wordArray,
      frequentWordCount: freqStats.freqCount 
    }) 
  }

  render() {
    let wordFrequencies = []
    if (this.state.mostFrequentWords.length > 0) {
      this.state.mostFrequentWords.forEach((word, index) => {
        wordFrequencies.push(
          <div key={index}>{word}: {this.state.prunedWordFrequencies[word]}</div>
        )
      })
    }
    
    // Select options
    let options = []
    for (let i=5; i<21; i++) {
      if (i==10) {
        options.push(<option key={i} value={i}>{i}</option>)
      } else {
        options.push(<option key={i} value={i}>{i}</option>)       
      }
    }

    // Data Array for pie chart
    let pieChartArray = []
    pieChartArray.push(['FreqOrNot','Frequency'])
    pieChartArray.push(['All Other Frequencies', this.state.totalWords - this.state.frequentWordCount])
    pieChartArray.push(['Most Frequent', this.state.frequentWordCount])
    console.log("pie chart array: ", pieChartArray)
    return (
      <div className='wordFrequencies'>
        <div className='select_div'>
          How many words would you like to view? 
          <select onChange={this.handleChange} value={this.state.selectedValue}>
            {options}
          </select>
        </div>
        <div className='content_tool'>
          {this.state.mostFrequentWords.length>1 ? 
          <Chart
            chartType='BarChart'
            data={this.state.mostFrequentWords}
            graphId='BarChart'
            width={'100%'}
            height={'500px'}
            options={{
              title: `Top ${this.state.mostFrequentWords.length-1} Word Frequencies`,
              backgroundColor: '#FAFAFA',
              colors: ['#00838F']
            }}
          /> : <div>Sorry, not enough data :( </div>
        } 
        
          <div className='donut_tool'>
            {this.state.mostFrequentWords.length > 1 ? 
            <Chart 
              chartType='PieChart'
              data={pieChartArray}
              graphId='PieChart'
              width={'100%'}
              height={'300px'}
              options={{
                title: `Ratio of Top ${this.state.mostFrequentWords.length-1} Words To Total`,
                backgroundColor: '#FAFAFA',
                colors: ['#00838F', '#006064'],
                pieHole: 0.4
              }}
            /> : <div></div>}
          </div> 
        </div>
      </div>      
    )
  }
}

/** 
 * Pruned word frequency dictionary (>1 occurence) and reduce stopwords
 * 
 * @param {array<string>} wordsArray
 * @returns {Object} 
*/
function getWordFreq(wordsArray) {
  let totalCount = 0
  let longestWord = ''
  let wordFreq = {}
  for (let i=0; i<wordsArray.length; i++) {
    let words = wordsArray[i].replace(/[^\s\w]/g, ' ').split(/\s+/g)
    for (let i=0; i<words.length; i++) {
      if(words[i] in wordFreq) {
        wordFreq[words[i]] += 1
      } else {
        wordFreq[words[i]] = 1
      }
      if (words[i].length > longestWord.length) {
        longestWord = words[i]
      }
      totalCount += 1
    }
  }
  
  // prune out one count words
  let prunedWordFreq = {}
  let keys= Object.keys(wordFreq)
  let onceWords = 0
  let stopWords = 0
  keys.forEach((key) => {
    if (wordFreq[key] == 1) {
      onceWords += wordFreq[key] 
    }
    if (stopwords.english.includes(key)) {
      stopWords += wordFreq[key] 
    }
    if (wordFreq[key] > 1 && key != "" && !(stopwords.english.includes(key))) {
      prunedWordFreq[key] = wordFreq[key]
    } 
  })
  return {
    'pruned': prunedWordFreq,
    'onceWords': onceWords,
    'stopWords': stopWords,
    'totalCount': totalCount,
    'longestWord': longestWord
  }
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
  let count = 0
  wordArray.push(['Word', 'Frequency'])
  spliced.forEach((word) => {
    wordArray.push([word, wordDict[word]])   
    count += wordDict[word]
  })
  return {
    'wordArray': wordArray,
    'freqCount': count
  }
}

// prop type declarations
WordFrequency.propTypes = {
  match: PropTypes.object
}

export default WordFrequency