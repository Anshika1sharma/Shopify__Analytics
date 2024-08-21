import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './about.css';

const AboutUs = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleGetStartedClick = () => {
        navigate('/'); // Navigate to the "/" route when the button is clicked
    };

    return (
        <div className="homepage">
            <div className="hero-section">
                <h1 className="main-heading">Welcome to the Shopify Insights Dashboard</h1>
                <p className="sub-heading">
                    Unlock the full potential of your Shopify store’s data with our advanced data visualization web application. Seamlessly integrated with MongoDB, this dashboard provides comprehensive insights into your e-commerce performance, helping you make data-driven decisions.
                </p>
                <button className="cta-button" onClick={handleGetStartedClick}>Get Started</button>
            </div>

            <div className="content-section">
                <div className="feature">
                    <h2>Sales Over Time</h2>
                    <p>Track and visualize total sales trends with daily, monthly, quarterly, and yearly breakdowns to identify revenue patterns and optimize sales strategies.</p>
                </div>

                <div className="feature">
                    <h2>Customer Growth Analysis</h2>
                    <p>Monitor new customer acquisition and growth trends to refine your marketing and outreach efforts.</p>
                </div>

                <div className="feature">
                    <h2>Repeat Customer Insights</h2>
                    <p>Discover patterns in repeat customer behavior to enhance retention and loyalty strategies.</p>
                </div>

                <div className="feature">
                    <h2>Geographical Distribution</h2>
                    <p>Analyze your customer base across different locations to tailor regional marketing strategies effectively.</p>
                </div>

                <div className="feature">
                    <h2>Customer Lifetime Value (CLV) by Cohort</h2>
                    <p>Evaluate the lifetime value of customers based on their first purchase month to assess long-term profitability.</p>
                </div>
            </div>

            <div className="footer">
                <p>Empower your business with actionable insights and interactive charts that help you understand and drive your Shopify store’s success. Dive into your data and transform it into strategic advantages!</p>
            </div>
        </div>
    );
};

export default AboutUs;

