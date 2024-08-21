// src/components/RepeatCustomersChart.js

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const RepeatCustomersChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/repeatCustomersDaily');
        
        // Check if response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Process chart data
  const chartData = {
    labels: data.map(item => `Customer ${item._id}`), // Assuming _id represents the customer ID
    datasets: [
      {
        label: 'Repeat Days Count',
        data: data.map(item => item.repeatDaysCount),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        tension: 0.1,
      }
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Repeat Customers Per Day',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Customer',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Repeat Days Count',
        },
        beginAtZero: true,
      },
    },
  };

  // Internal CSS styles
  const styles = {
    heading: {
      textAlign: 'center',
      marginTop: '20px',
    },
    chartContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '400px',
      margin: '0 auto',
    },
    chart: {
      width: '100% !important',
      height: '100% !important',
    },
  };

  return (
    <div>
      <h2 style={styles.heading}>Number of Repeat Customers Per Day</h2>
      <div style={styles.chartContainer}>
        <Line data={chartData} options={options} style={styles.chart} />
      </div>
    </div>
  );
};

export default RepeatCustomersChart;










