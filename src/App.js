import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Query from './components/query';
import { CssBaseline } from '@mui/material';
import Header from './components/header';
import Footer from './components/footer';
// import FundTrendChart from './components/FundTrendChart';
// import FundAnalysis from './components/FundAnalysis';

//alpha vantage key: BLNLMLH5L5Z25HT7
function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <div className="App">
        <Routes>
          {/* <Route path="/" exact component={Dashboard} />
          <Route path="/chart" component={FundChart} />
          <Route path="/analysis" component={Analysis} /> */}
          <Route path="/query" element={<Query />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;