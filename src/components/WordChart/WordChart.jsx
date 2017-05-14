import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from "d3";

class WordChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 300,
      height: 300
    }
  } 

  render() {
    let data = [
      { month:'Jan', value:40 },
      { month:'Feb', value:50 },
      { month:'Mar', value:65 },
      { month:'Apr', value:60 },
      { month:'May', value:70 },
      { month:'Jun', value:55 },
      { month:'Jul', value:80 },
      { month:'Aug', value:55 },
      { month:'Sep', value:75 },
      { month:'Oct', value:50 },
      { month:'Nov', value:60 },
      { month:'Dec', value:75 }
    ]
    
  var margin={top:5,right:5,bottom:5,left:5},
  w=this.state.width-(margin.left+margin.right),
  h=this.props.height-(margin.top+margin.bottom);

  var transform='translate('+margin.left+','+margin.top+')';

  var x=d3.scaleBand()
      .domain(data.map(function(d){
          return d.month;
      })).rangeRound([0, this.state.width])
      // .rangeRoundBands([0,this.state.width],.35);

  var y=d3.scaleLinear()
      .domain([0,100])
      .range([this.props.height,0]);

  var rectBackground=(data).map(function(d, i) {
    return (
        <rect fill="#58657f" rx="3" ry="3" key={i}
              x={x(d.month)} y={margin.top-margin.bottom}
              height={h}
              width={x.bandwidth()}/>
    )
  });
  var rectForeground=(data).map(function(d, i) {
    return (
      <rect fill="#74d3eb" rx="3" ry="3" key={i}
        x={x(d.month)} y={y(d.value)} className="shadow"
        height={h-y(d.value)}
        width={x.bandwidth()}/>
    )
  });

  return(
    <div>
      <svg id={this.props.chartId} width={this.state.width}
            height={this.props.height}>

          <g transform={transform}>
              {rectBackground}
              {rectForeground}
          </g>
      </svg>
    </div>
    );
  }
}

WordChart.defaultProps = {
  width: 300,
  height: 300,
  chartId: 'v_chart'
}

WordChart.propTypes = {
  height: PropTypes.number,
  chartId: PropTypes.string 
}

export default WordChart