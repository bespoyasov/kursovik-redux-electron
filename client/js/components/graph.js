import React from 'react';
import { Chart } from 'react-d3-core';
import { LineChart } from 'react-d3-basic';


export default class GraphView extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() {

  }


  render() {
    const chartData = [
          {
              "age": 39,
              "index": 0
          },
          {
              "age": 38,
              "index": 1
          },
          {
              "age": 34,
              "index": 2
          },
          {
              "age": 12,
              "index": 3
          }
      ];


    var width = 450,
        height = 300,
        margins = {left: 0, right: 0, top: 0, bottom: 0},
        chartSeries = [
          {
            field: 'age',
            name: 'Age',
            color: '#ffffff',
            style: {
              strokeWidth: 1,
              strokeOpacity: 1,
              fillOpacity: 1
            }
          }
        ],
        x = function(d) {
          return d.index;
        };

    return (
      <div className="graph">
        <LineChart
          margins= {margins}
          data={chartData}
          width={width}
          height={height}
          chartSeries={chartSeries}
          x={x}
        />
      </div>
    )
  }
}
