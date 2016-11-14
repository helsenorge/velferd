import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import { calculateDateRange, getNumberofColumnsinChart }
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

  getOverlayData(from, to) {
    return {
      name: 'overlay',
      className: 'chart-overlay',
      data: [
        { x: Math.floor(from.getTime() / 1000), y: this.props.high + 10 },
        { x: Math.floor(to.getTime() / 1000), y: this.props.high + 10 },
      ] };
  }

  getReferenceValuesData(value) {
    return {
      name: 'referenceValues',
      className: 'ref-values-series',
      data: [
        { x: Math.floor(this.props.fromDate.getTime() / 1000), y: value },
        { x: Math.floor(this.props.toDate.getTime() / 1000), y: value },
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
          'clip-path': 'url(#chart-mask)',
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
    const { dataPoints, fromDate, toDate, idealValues,
      low, high, selectedDate } = this.props;
    const series = this.getValues(dataPoints);

    if (idealValues) {
      idealValues.forEach(range => {
        if (range.high.value) {
          series.push(this.getReferenceValuesData(range.high.value));
        }
        if (range.low.value) {
          series.push(this.getReferenceValuesData(range.low.value));
        }
      });
    }

    if (selectedDate) {
      series.push(this.getOverlayData(fromDate, selectedDate));
      const from2 = new Date(selectedDate.getTime());
      from2.setDate(from2.getDate() + 1);
      series.push(this.getOverlayData(from2, toDate));
    }

    const data = {
      series,
    };

    const dateRange = calculateDateRange(fromDate, toDate);

    let divisor;
    let ticks;

    if (dateRange > 30) {
      ticks = [];
      const firstTick = new Date(fromDate.getFullYear(), fromDate.getMonth(), 0, 24, 0, 0, 0);
      console.log(firstTick);
      firstTick.setMonth(firstTick.getMonth() + 1);
      console.log(firstTick);
      for (let d = firstTick; d < toDate; d.setMonth(d.getMonth() + 1)) {
        ticks.push(Math.floor(d.getTime() / 1000));
      }
    }
    else {
      divisor = getNumberofColumnsinChart(dateRange);
    }

    console.log(dateRange);

    console.log(ticks);

    const options = {
      showPoint: dateRange <= 14,
      lineSmooth: false,
      showArea: true,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
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
        offset: 0,
        type: Chartist.FixedScaleAxis,
        low: Math.floor(fromDate.getTime() / 1000),
        high: Math.floor(toDate.getTime() / 1000),
        divisor,
        ticks,
      },
      series: {
        referenceValues: {
          showPoint: false,
          showArea: false,
          showLine: true,
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
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  idealValues: PropTypes.array,
};

export default Chart;
