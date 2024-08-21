// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './homepage';
import CLVByCohortChart from './Customer Lifetime Value by Cohorts';
import MapComponent from './Geographical Distribution of Customers/geographicalDistribution';
import NewCustomersChart from './New Customers Added Over Time/daily';
import NewCustomersMonthlyChart from './New Customers Added Over Time/monthly';
import NewCustomersQuarterlyChart from './New Customers Added Over Time/quarterly';
import NewCustomersYearlyChart from './New Customers Added Over Time/yearly';
import CombinedRepeatCustomersChart from './Number of Repeat Customers/combined';
import DailySalesGrowthChart from './Sales Growth Rate Over Time/daily';
import MonthlySalesGrowthChart from './Sales Growth Rate Over Time/monthly';
import QuarterlySalesGrowthChart from './Sales Growth Rate Over Time/quartely';
import YearlySalesGrowthChart from './Sales Growth Rate Over Time/yearly';
import RepeatCustomersChart from './Number of Repeat Customers/daily';
import RepeatCustomersChartMonthly from './Number of Repeat Customers/monthly';
import RepeatCustomersQuarterlyChart from './Number of Repeat Customers/quarterly';
import RepeatCustomersYearlyChart from './Number of Repeat Customers/yearly';
import SalesByMonthChart from './Total Sales Overtime/monthly';
import SalesByQuarterChart from './Total Sales Overtime/quarterly';
import SalesByDayChart from './Total Sales Overtime/daily';
import SalesByYearChart from './Total Sales Overtime/yearly';
import View from './view';
import AboutUs from './about';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/CustomerLifetimeValue" element={<CLVByCohortChart />} />
            <Route path="/geographicalDistribution" element={<MapComponent />} />
            <Route path="/customerDailyadded" element={<NewCustomersChart />} />
            <Route path="/customerMonthlyadded" element={<NewCustomersMonthlyChart />} />
            <Route path="/customerQuarterlyadded" element={<NewCustomersQuarterlyChart />} />
            <Route path="/customerYearlyadded" element={<NewCustomersYearlyChart />} />
            <Route path="/repeatedcustomer" element={<CombinedRepeatCustomersChart />} />
            <Route path="/dailygrowthrate" element={<DailySalesGrowthChart />} />
            <Route path="/monthlygrowthrate" element={<MonthlySalesGrowthChart />} />
            <Route path="/querterlygrowthrate" element={<QuarterlySalesGrowthChart />} />
            <Route path="/yearlygrowthrate" element={<YearlySalesGrowthChart />} />
            <Route path="/repeatcustomerdaily" element={<RepeatCustomersChart />} />
            <Route path="/repeatcustomermonthly" element={<RepeatCustomersChartMonthly />} />
            <Route path="/repeatcustomerquarterly" element={<RepeatCustomersQuarterlyChart />} />
            <Route path="/repeatcustomeryearly" element={<RepeatCustomersYearlyChart />} />
            <Route path="/dailysalesgrowth" element={<DailySalesGrowthChart />} />
            <Route path="/monthlysalesgrowth" element={<MonthlySalesGrowthChart />} />
            <Route path="/yearlysalesgrowth" element={<YearlySalesGrowthChart />} />
            <Route path="/quarterlysalesgrowth" element={<QuarterlySalesGrowthChart />} />
            <Route path="/dailysales" element={<SalesByDayChart />} />
            <Route path="/monthlysales" element={<SalesByMonthChart />} />
            <Route path="/quarterlysales" element={<SalesByQuarterChart />} />
            <Route path="/yearlysales" element={<SalesByYearChart />} />
            <Route path="/ViewAnalytics" element={<View />} />
            <Route path='/aboutus' element={<AboutUs />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
