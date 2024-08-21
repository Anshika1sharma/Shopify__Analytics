import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const YearlySalesGrowthChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        const response = await fetch('http://localhost:5000/yearlySalesGrowthRate');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        // Prepare data for the chart
        const labels = result.map(item => item.year.toString()); // Year as labels

        // Handle the growthRate parsing for both cases
        const growthRates = result.map(item => 
          typeof item.growthRate === 'object' 
          ? parseFloat(item.growthRate['$numberDecimal']) 
          : item.growthRate
        );

        setData({
          labels,
          datasets: [
            {
              label: 'Yearly Sales Growth Rate (%)',
              data: growthRates,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.1,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales growth data:', error);
      }
    };

    fetchGrowthData();
  }, []);

  return (
    <div className="chart-page">
      <h2 className="chart-heading">Yearly Sales Growth Rate</h2>
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
                    return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`; // Display as percentage
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
                  text: 'Growth Rate (%)'
                },
                ticks: {
                  callback: function (value) {
                    return value.toFixed(2) + '%'; // Display as percentage
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

export default YearlySalesGrowthChart;
