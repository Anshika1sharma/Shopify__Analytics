import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const RepeatCustomersMonthlyChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/repeatCustomersByMonth');
        const result = await response.json();

        // Format the labels as "YYYY-MM" and get the count of repeat customers
        const labels = result.map(item => `${item._id.year}-${String(item._id.month).padStart(2, '0')}`);
        const repeatCustomersData = result.map(item => item.repeatCustomers);

        setData({
          labels,
          datasets: [
            {
              label: 'Repeat Customers Per Month',
              data: repeatCustomersData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1,
              tension: 0.1,
            }
          ],
        });
      } catch (error) {
        console.error('Error fetching repeat customers data:', error);
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
      width: '100%',
      height: '100%',
    }
  };

  return (
    <div>
      <h2 style={styles.heading}>New Customers Added Per Month</h2>
      <div style={styles.chartContainer}>
        <Line data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default RepeatCustomersMonthlyChart;



