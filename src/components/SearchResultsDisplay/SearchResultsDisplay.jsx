import React from 'react';


class SearchResultsDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>User Value: {this.props.userValue}</div> 
    )
  }
}


export default SearchResultsDisplay;