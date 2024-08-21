import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CLVByCohortChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchCLVData = async () => {
      try {
        const response = await fetch('http://localhost:5000/clvByCohort');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        // Prepare data for the chart
        const labels = result.map(item => item._id); // Cohort (Month-Year)
        const averageCLV = result.map(item => item.averageCLV); // Average CLV for each cohort

        setData({
          labels,
          datasets: [
            {
              label: 'Average CLV by Cohort',
              data: averageCLV,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.1,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching CLV data:', error);
      }
    };

    fetchCLVData();
  }, []);

  return (
    <div className="chart-wrapper">
      <h2 className="chart-heading">Customer Lifetime Value by Cohort</h2>
      <div className="chart-container">
        <Line 
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  font: {
                    weight: 'bold' // Thicker font for legend
                  }
                }
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`; // Display as currency
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Cohort (Month-Year)',
                  font: {
                    weight: 'bold' // Thicker font for x-axis title
                  }
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  font: {
                    weight: 'bold' // Thicker font for x-axis labels
                  }
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Average CLV ($)',
                  font: {
                    weight: 'bold' // Thicker font for y-axis title
                  }
                },
                ticks: {
                  callback: function (value) {
                    return `$${value.toFixed(2)}`; // Display as currency
                  },
                  font: {
                    weight: 'bold' // Thicker font for y-axis labels
                  }
                }
              }
            }
          }}
        />
      </div>
      <style jsx>{`
        .chart-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center; /* Center the content horizontally */
          text-align: center; /* Center the heading text */
        }
        .chart-heading {
          font-size: 24px; /* Adjust font size of the heading */
          margin-bottom: 20px;
        }
        .chart-container {
          width: 80%; /* Medium size for the chart */
          max-width: 800px; /* Optional: max width for better responsiveness */
          height: 400px;
        }
      `}</style>
    </div>
  );
};

export default CLVByCohortChart;
