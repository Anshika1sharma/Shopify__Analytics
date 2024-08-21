import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const NewCustomersYearlyChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/newCustomersByYear');
        const result = await response.json();

        // Extract year and new customers count
        const labels = result.map(item => item._id);
        const newCustomersData = result.map(item => item.newCustomers);

        setData({
          labels,
          datasets: [
            {
              label: 'New Customers Per Year',
              data: newCustomersData,
              borderColor: 'rgba(255, 159, 64, 1)',
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
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
    chart: {
      width: '100% !important',
      height: '100% !important',
    },
  };

  return (
    <div>
      <h2 style={styles.heading}>New Customers Added Over Time (Yearly)</h2>
      <div style={styles.chartContainer}>
        <Line data={data} options={{ maintainAspectRatio: false, responsive: true }} style={styles.chart} />
      </div>
    </div>
  );
};

export default NewCustomersYearlyChart;

