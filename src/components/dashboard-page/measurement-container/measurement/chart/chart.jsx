import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import { formatDate, calculateDateRange, getNumberofColumnsinChart }
  from '../../../../../helpers/date-helpers.js';
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

  getSelectedDateData(selectedDate) {
    const to = new Date(selectedDate.getTime());
    to.setDate(to.getDate() + 1);

    return {
      name: 'selectedColumn',
      data: [
        { x: Math.floor(selectedDate.getTime() / 1000), y: this.props.high },
        { x: Math.floor(to.getTime() / 1000), y: this.props.high },
      ] };
  }

  getReferenceValuesData() {
    return {
      name: 'referenceValues',
      data: [
        { x: Math.floor(this.props.fromDate.getTime() / 1000), y: this.props.highReference },
        { x: Math.floor(this.props.toDate.getTime() / 1000), y: this.props.highReference },
      ] };
  }

  displayPointsPlugin(chart) {
    chart.on('created', (data) => {
      const chartRect = data.chartRect;
      const defs = data.svg.querySelector('defs') || data.svg.elem('defs');
      const width = chartRect.width();
      const height = chartRect.height();

      defs
        .elem('clipPath', {
          id: 'chart-mask',
        })
        .elem('rect', {
          x: chartRect.x1,
          y: chartRect.y2,
          width,
          height,
          fill: 'white',
        });
    });

    chart.on('draw', (data) => {
      if (data.type === 'point') {
        data.group.elem('text', {
          x: data.x,
          y: data.y - 10,
          style: 'text-anchor: middle',
        }, 'ct-label').text(data.value.y);
      }
      if (data.type === 'line' ||
          data.type === 'point' ||
          data.type === 'text' ||
          data.type === 'area') {
        data.element.attr({
          'clip-path': 'url(#chart-mask)',
        });
      }
    });
  }

  render() {
    const { dataPoints, fromDate, toDate, lowReference, low, high, selectedDate } = this.props;
    const series = this.getValues(dataPoints);
    series.push(this.getReferenceValuesData());

    if (selectedDate) series.push(this.getSelectedDateData(selectedDate));

    const data = {
      series,
    };

    const dateRange = calculateDateRange(fromDate, toDate);

    const options = {
      showPoint: dateRange <= 14,
      lineSmooth: false,
      showArea: true,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: -30,
        left: 0,
      },
      axisY: {
        high,
        low,
        onlyInteger: true,
        showGrid: false,
        showLabel: true,
      },
      axisX: {
        showLabel: false,
        type: Chartist.FixedScaleAxis,
        low: Math.floor(fromDate.getTime() / 1000),
        high: Math.floor(toDate.getTime() / 1000),
        divisor: getNumberofColumnsinChart(dateRange),
        labelInterpolationFnc(value) {
          return formatDate(new Date(value * 1000));
        },
      },
      series: {
        referenceValues: {
          showPoint: false,
          showArea: false,
          showLine: false,
          areaBase: lowReference,
        },
        selectedColumn: {
          showPoint: false,
          showArea: true,
          showLine: false,
          areaBase: low,
        },
      },
      plugins: [
        this.displayPointsPlugin,
      ],
    };
    return (
      <div className="measurement-chart">
        <ChartistGraph data={data} options={options} type={'Line'} className="ct-double-octave" />
      </div>
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
  selectedDate: React.PropTypes.instanceOf(Date),
};

export default Chart;
