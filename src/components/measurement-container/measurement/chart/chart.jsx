import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import { formatDate } from '../../../../helpers/date-helpers.js';
import './chart.scss';

class Chart extends Component {

  getValues(dataPoints) {
    const values = [];
    dataPoints.forEach((entry) => {
      for (let i = 0; i < entry.value.length; i++) {
        const dateTime = new Date(entry.date).getTime();
        const data = {
          x: Math.floor(dateTime / 1000),
          y: entry.value[i] };

        if (!values[i]) {
          values.push([data]);
        }
        else {
          values[i].push(data);
        }
      }
    }, this);
    return values;
  }

  getDaysShown() {
    const timeDiff = Math.abs(this.props.toDate.getTime() - this.props.fromDate.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  getNumberofColumns(daysShown) {
    if (daysShown >= 90) {
      return 14;
    }

    return daysShown;
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
    const series = this.getValues(this.props.dataPoints);
    const referenceValues = {
      name: 'referenceValues',
      data: [
        { x: Math.floor(this.props.fromDate.getTime() / 1000), y: this.props.highReference },
        { x: Math.floor(this.props.toDate.getTime() / 1000), y: this.props.highReference },
      ] };
    series.push(referenceValues);
    const data = {
      series,
    };

    const daysShown = this.getDaysShown();

    const options = {
      showPoint: daysShown <= 14,
      lineSmooth: false,
      axisY: {
        high: this.props.high,
        low: this.props.low,
        onlyInteger: true,
      },
      axisX: {
        type: Chartist.FixedScaleAxis,
        low: Math.floor(this.props.fromDate.getTime() / 1000),
        high: Math.floor(this.props.toDate.getTime() / 1000),
        divisor: this.getNumberofColumns(daysShown),
        labelInterpolationFnc(value) {
          return formatDate(new Date(value * 1000));
        },
      },
      series: {
        referenceValues: {
          showPoint: false,
          showArea: true,
          showLine: false,
          areaBase: this.props.lowReference,
        },
      },
      plugins: [
        this.displayPointsPlugin,
      ],
    };

    return (
      <ChartistGraph data={data} options={options} type={'Line'} />
    );
  }
}

Chart.propTypes = {
  dataPoints: PropTypes.array.isRequired,
  high: PropTypes.number.isRequired,
  low: PropTypes.number.isRequired,
  highReference: PropTypes.number.isRequired,
  lowReference: PropTypes.number.isRequired,
  fromDate: React.PropTypes.instanceOf(Date).isRequired,
  toDate: React.PropTypes.instanceOf(Date).isRequired,
};

export default Chart;
