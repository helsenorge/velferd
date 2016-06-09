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
      showPoint: true,
      fullWidth: true,
      chartPadding: {
        right: 80,
      },
      labelOffset: 10,
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
