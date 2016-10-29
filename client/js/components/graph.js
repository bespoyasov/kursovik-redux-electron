import React from 'react';
import { Line } from 'react-chartjs-2';
import cst from '../const';


export default class GraphView extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  render() {
    const color = this.props.color;

    const chartData = {
      labels: this.props.course.week.labels,
      datasets: [
        {
          ...cst.CHART_DATASET_OPTIONS,
          data: this.props.course.week.data,
        }
      ]
    };

    const chartOptions = {
      ...cst.CHART_OPTIONS,
      tooltips: {
        ...cst.CHART_OPTIONS.tooltips,
        bodyFontColor: color,
        callbacks: {
          label: (tooltipItem, data) => {
            return tooltipItem.yLabel.toFixed(2).toString().replace('.', ',') + ' ' + cst.RUB_SIGN;
          },
          footer: () => ''
        }
      }
    };

    return (
      <div className="graph">
        <Line
          redraw
          data={chartData}
          options={chartOptions}
        />
      </div>
    )
  }
}
