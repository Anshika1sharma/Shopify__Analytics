import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesByMonthChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:5000/salesByMonth');
        const result = await response.json();

        // Prepare data for the chart
        const labels = result.map(item => `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`);
        const salesData = result.map(item => Math.round(parseFloat(item.totalSales.$numberDecimal))); // Round to nearest integer

        setData({
          labels, // Dates (x-axis, formatted as "YYYY-MM")
          datasets: [
            {
              label: 'Total Sales Per Month',
              data: salesData, // Sales amounts (y-axis) rounded to integers
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.1,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="chart-page">
      <h2 className="chart-heading">Total Sales Over Time (Monthly)</h2>
      <div className="chart-container">
        <Line 
          data={data} 
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: ${context.parsed.y.toFixed(0)}`; // Display as integer
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Month'
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 12 // Adjust based on your data
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Total Sales'
                },
                ticks: {
                  callback: function (value) {
                    return Number.isInteger(value) ? value : ''; // Display only integers
                  },
                },
              }
            }
          }}
        />
      </div>
      <style jsx>{`
        /* Center the heading at the top */
        .chart-heading {
          text-align: center;
          margin-bottom: 20px; /* Add space below the heading */
        }

        /* Center the chart and set its size */
        .chart-container {
          width: 100%;
          height: 400px;
          display: flex;
          justify-content: center; /* Center horizontally */
          align-items: center; /* Center vertically */
        }
      `}</style>
    </div>
  );
};

export default SalesByMonthChart;

