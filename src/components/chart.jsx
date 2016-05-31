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
      showPoint: false,
      axisX: {
        labelInterpolationFnc(value, index) {
          return index % 4 === 0 ? value : null;
        },
      },
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
