// src/components/CombinedRepeatCustomersChart.js

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './styles.css';

// Register necessary Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const CombinedRepeatCustomersChart = () => {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [quarterlyData, setQuarterlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dailyResponse = await fetch('http://localhost:5000/repeatCustomersDaily');
        const monthlyResponse = await fetch('http://localhost:5000/repeatCustomersByMonth');
        const quarterlyResponse = await fetch('http://localhost:5000/repeatCustomersByQuarter');
        const yearlyResponse = await fetch('http://localhost:5000/repeatCustomersByYear');
        
        if (!dailyResponse.ok || !monthlyResponse.ok || !quarterlyResponse.ok || !yearlyResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const [dailyResult, monthlyResult, quarterlyResult, yearlyResult] = await Promise.all([
          dailyResponse.json(),
          monthlyResponse.json(),
          quarterlyResponse.json(),
          yearlyResponse.json()
        ]);

        setDailyData(dailyResult);
        setMonthlyData(monthlyResult);
        setQuarterlyData(quarterlyResult);
        setYearlyData(yearlyResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Process chart data
  const chartData = {
    labels: [
      ...dailyData.map(item => `Day ${item._id}`), 
      ...monthlyData.map(item => `${item._id.year}-${String(item._id.month).padStart(2, '0')}`),
      ...quarterlyData.map(item => `Q${item._id.quarter} ${item._id.year}`),
      ...yearlyData.map(item => item._id),
    ],
    datasets: [
      {
        label: 'Daily Repeat Customers',
        data: dailyData.map(item => item.repeatDaysCount),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: 'Monthly Repeat Customers',
        data: monthlyData.map(item => item.repeatCustomers),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: 'Quarterly Repeat Customers',
        data: quarterlyData.map(item => item.repeatCustomers),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: 'Yearly Repeat Customers',
        data: yearlyData.map(item => item.repeatCustomers),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
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
        text: 'Repeat Customers Data Across Different Intervals',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
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

  return <div className="chart-container"><Line data={chartData} options={options} /></div>;
};

export default CombinedRepeatCustomersChart;
