import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';

class Chart extends Component {

  componentDidMount() {
  }

  getLabel(item) {
    const date = new Date(item.date);
    return date.toLocaleDateString();
  }

  getValue(item) {
    return item.value;
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
    const labels = this.props.dataPoints.map(this.getLabel);
    const values = this.props.dataPoints.map(this.getValue);
    const simpleLineChartData = {
      labels,
      series: [
        values,
      ],
    };
    const options = {
      showArea: true,
      showPoint: true,
      lineSmooth: false,
      fullWidth: true,
      chartPadding: {
        right: 80,
        top: 20,
      },
      axisY: {
        showLabel: false,
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
};

export default Chart;
