import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesByYearChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:5000/salesByYear');
        const result = await response.json();

        // Prepare data for the chart
        const labels = result.map(item => item._id.toString());
        const salesData = result.map(item => parseFloat(item.totalSales.$numberDecimal));

        setData({
          labels, // Years (x-axis)
          datasets: [
            {
              label: 'Total Sales Per Year',
              data: salesData, // Sales amounts (y-axis) converted to numbers
              borderColor: 'rgba(255, 159, 64, 1)',
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderWidth: 2,
              tension: 0.1,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching yearly sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="chart-page">
      <h2 className="chart-heading">Total Sales Over Time (Yearly)</h2>
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
                    return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`; // Display as number with 2 decimals
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Year'
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Total Sales'
                },
                ticks: {
                  callback: function (value) {
                    return value.toFixed(2); // Display with 2 decimals
                  }
                }
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

export default SalesByYearChart;
