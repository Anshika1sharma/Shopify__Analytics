import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './styles.css';

// Register necessary Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const RepeatCustomersChartMonthly = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/repeatCustomersByMonth');
        
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
    labels: data.map(item => `${item._id.year}-${String(item._id.month).padStart(2, '0')}`), // Format as YYYY-MM
    datasets: [
      {
        label: 'Repeat Customers',
        data: data.map(item => item.repeatCustomers),
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
        text: 'Number Of Repeat Customers by Month',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Repeat Customers Count',
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
  };

  return (
    <div>
      <h2 style={styles.heading}>Number Of Repeat Customers by Month</h2>
      <div style={styles.chartContainer}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RepeatCustomersChartMonthly;





