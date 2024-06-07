import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Query from './components/query';
import { CssBaseline } from '@mui/material';
import Header from './components/header';
import Footer from './components/footer';
import { FundProvider } from './contexts/FundContext';
import FundDetail from './components/fundDetails';

function App() {
  return (
    <FundProvider>
      <Router>
        <CssBaseline />
        <Header />
        <div className="App">
          <Routes>
            <Route path="/query" element={<Query />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/fund" element={<FundDetail />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </FundProvider>
  );
}

export default App;