import React from 'react';
import { Link } from 'react-router-dom';
import './view.css'; // Assuming the CSS is saved as homepage.css

const View = () => {
  return (
    <div className="homepage">
      <h1>Data Visualization Dashboard</h1>

      <div className="headings-container">
        <div className="heading">Total Sales Over Time:</div>
        <Link to="/dailysales">
          <button>Daily</button>
        </Link>
        <Link to="/monthlysales">
          <button>Monthly</button>
        </Link>
        <Link to="/quarterlysales">
          <button>Quarterly</button>
        </Link>
        <Link to="/yearlysales">
          <button>Yearly</button>
        </Link>
      </div>

      <div className="headings-container">
        <div className="heading">Sales Growth Rate Over Time</div>
        <Link to="/dailygrowthrate">
          <button>Daily</button>
        </Link>
        <Link to="/monthlygrowthrate">
          <button>Monthly</button>
        </Link>
        <Link to="/querterlygrowthrate">
          <button>Quarterly</button>
        </Link>
        <Link to="/yearlygrowthrate">
          <button>Yearly</button>
        </Link>
      </div>

      <div className="headings-container">
        <div className="heading">New Customers Added Over Time</div>
        <Link to="/customerDailyadded">
          <button>Daily</button>
        </Link>
        <Link to="/customerMonthlyadded">
          <button>Monthly</button>
        </Link>
        <Link to="/customerQuarterlyadded">
          <button>Quarterly</button>
        </Link>
        <Link to="/customerYearlyadded">
          <button>Yearly</button>
        </Link>
      </div>

      <div className="headings-container">
        <div className="heading">Number of Repeat Customers</div>
        <Link to="/repeatcustomerdaily">
          <button>Daily</button>
        </Link>
        <Link to="/repeatcustomermonthly">
          <button>Monthly</button>
        </Link>
        <Link to="/repeatcustomerquarterly">
          <button>Quarterly</button>
        </Link>
        <Link to="/repeatcustomeryearly">
          <button>Yearly</button>
        </Link>
      </div>

      <div className="headings-container">
        <div className="heading">Geographical Distribution of Customers</div>
        <Link to="/geographicalDistribution">
          <button>View Distribution</button>
        </Link>
      </div>

      <div className="headings-container">
        <div className="heading">Customer Lifetime Value by Cohorts</div>
        <Link to="/CustomerLifetimeValue">
          <button>View CLV by Cohorts</button>
        </Link>
      </div>
    </div>
  );
};

export default View;
