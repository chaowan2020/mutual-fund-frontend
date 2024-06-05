import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Grid, TextField, Card, CardContent } from '@mui/material';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { FundContext } from '../contexts/FundContext';
import NewsComponent from './news';

const fetchFundData = async (setFundDetail, id) => {
  const result = await apiService.getMutualFunds(id);
  const rawData = result?.data ?? [];
  setFundDetail(rawData.map(item => ({
    time: item.date,
    value: parseFloat(item.close),
    open: parseFloat(item.open),
    high: parseFloat(item.high),
    low: parseFloat(item.low),
    close: parseFloat(item.close)
  })));
}

const Dashboard = () => {
  const [funds, setFunds] = useState([]);
  const [search, setSearch] = useState('');
  const { setFundDetail, setId } = useContext(FundContext);
  const navigate = useNavigate();
  const filteredFunds = funds.filter(fund =>
    fund.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = async () => {
    setId(search);
    await fetchFundData(setFundDetail, search);
    navigate('/fund');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Mutual Fund Dashboard</Typography>
      <TextField
        label="Search Funds"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={e => setSearch(e.target.value)}
        onBlur={handleConfirm}
      />
      <Typography variant="h5" gutterBottom>Latest Market News</Typography>
      <NewsComponent />
      <Grid container spacing={3}>
        {filteredFunds.map(fund => (
          <Grid item xs={12} sm={6} md={4} key={fund.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{fund.name}</Typography>
                <Typography variant="body2">Return Rate: {fund.returnRate}%</Typography>
                <Typography variant="body2">Risk Level: {fund.riskLevel}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;