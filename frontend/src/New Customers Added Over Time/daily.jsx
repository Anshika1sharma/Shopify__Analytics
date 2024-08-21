import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const NewCustomersChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/newCustomerByDaily');
        const result = await response.json();
        const labels = result.map(item => item._id);
        const newCustomersData = result.map(item => item.newCustomers);

        setData({
          labels,
          datasets: [
            {
              label: 'New Customers Per Day',
              data: newCustomersData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1,
              tension: 0.1,
            }
          ],
        });
      } catch (error) {
        console.error('Error fetching new customers data:', error);
      }
    };

    fetchData();
  }, []);

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
    chartCanvas: {
      width: '100% !important',
      height: '100% !important',
    }
  };

  return (
    <div>
      <h2 style={styles.heading}>New Customers Added Per Day</h2>
      <div style={styles.chartContainer}>
        <Line data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default NewCustomersChart;
