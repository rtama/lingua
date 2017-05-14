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
      totalWords: 0
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
        mostFrequentWords: kFreq,
      }) 
    })
  }

  handleChange(event) {
    this.setState({
      selectedValue: event.target.value,
      mostFrequentWords: getKMostFreq(this.state.prunedWordFrequencies, event.target.value)
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
    pieChartArray.push(['All Other Frequencies', Object.keys(this.state.prunedWordFrequencies).length - this.state.mostFrequentWords.length])
    pieChartArray.push(['Most Frequent', this.state.mostFrequentWords.length])

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
          /> : <div></div>
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