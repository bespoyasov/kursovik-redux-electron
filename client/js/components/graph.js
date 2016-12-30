import React from 'react';
import { Line } from 'react-chartjs-2';
import cst from '../const';


export default class GraphView extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  shouldComponentUpdate(nextProps, nextState) {
    return (
      // if user reloaded
      !nextProps.app.isLoading && this.props.app.isLoading ||
      // if changed graph
      JSON.stringify(nextProps.course[nextProps.period]) !=
      JSON.stringify(this.props.course[this.props.period])
    )
  }


  render() {
    const color = this.props.color;
    const period = this.props.period;

    const chartData = {
      labels: this.props.course[period].labels,
      datasets: [
        {
          ...cst.CHART_DATASET_OPTIONS,
          pointRadius: cst.CHART_POINT_BORDER_WIDTH[period],
          pointHoverRadius: cst.CHART_POINT_BORDER_WIDTH[period] + 1,
          data: this.props.course[period].data,
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
            const propsData = this.props.course[period];
            const prefix = propsData.fulllabels[tooltipItem.index] + ': ';

            return prefix +
              tooltipItem.yLabel.toFixed(2).toString().replace('.', ',') + ' ' +
              cst.RUB_SIGN
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
