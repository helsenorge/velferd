import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import { formatDate } from '../date-helpers/date-helpers.js';

class Chart extends Component {

  componentDidMount() {
  }

  getLabel(item) {
    let label = formatDate(item.date);

    if (item.status) {
      label += `</br>${item.status}`;
    }
    return label;
  }

  getValues(dataPoints) {
    const values = [];
    dataPoints.forEach((entry) => {
      for (let i = 0; i < entry.value.length; i++) {
        const value = entry.value[i];

        if (!values[i]) {
          values.push([value]);
        }
        else {
          values[i].push(value);
        }
      }
    }, this);
    return values;
  }

  displayPointsPlugin(chart) {
    chart.on('draw', (data) => {
      if (data.type === 'point') {
        data.group.elem('text', {
          x: data.x,
          y: data.y - 10,
          style: 'text-anchor: middle',
        }, 'ct-label').text(data.value.y);
      }
    });
  }

  render() {
    const labels = this.props.dataPoints.map(this.getLabel, this);
    const simpleLineChartData = {
      labels,
      series: this.getValues(this.props.dataPoints),
    };

    const options = {
      showArea: true,
      showPoint: true,
      lineSmooth: false,
      fullWidth: false,
      chartPadding: {
        right: 80,
        top: 20,
        bottom: 20,
      },
      axisY: {
        showLabel: true,
        high: this.props.high,
        low: this.props.low,
        labelInterpolationFnc: function formatLabels(value, index, labels) {
          return index === 0 || index === labels.length - 1 ? value : '';
        },
      },
      axisX: {
        showGrid: false,
      },
      labelOffset: 10,
      plugins: [
        this.displayPointsPlugin,
      ],
    };

    return (
      <ChartistGraph data={simpleLineChartData} options={options} type={'Line'} />
    );
  }
}

Chart.propTypes = {
  dataPoints: PropTypes.array.isRequired,
  high: PropTypes.number,
  low: PropTypes.number,
};

export default Chart;
