import React from 'react';
import PropTypes from 'prop-types';
import { LineChart } from '@mui/x-charts';

const Graph = ({ data }) => {
  // Check if data is provided and is an array
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  // Extract dates and prices from data array
  const dates = data.map(item => new Date(item.date));
  const prices = data.map(item => item.price);

  // Define series for the LineChart
  const series = [{
    data: prices,
    showMark: true, // To display the marks on the chart
  }];

  return (
    <div>
      <LineChart
        xAxis={[{ data: dates }]}
        series={series}
        width={500}
        height={400}
        aspectRatio={2} // Adjust aspect ratio for better visualization
        xAxisLabel="Date" // Add a descriptive label for the x-axis
      />
    </div>
  );
};
Graph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default Graph;