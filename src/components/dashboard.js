import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, TextField, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  const [funds, setFunds] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/api/funds')
      .then(response => setFunds(response.data))
      .catch(error => console.error('Error fetching funds:', error));
  }, []);

  const filteredFunds = funds.filter(fund => 
    fund.name.toLowerCase().includes(search.toLowerCase())
  );

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
      />
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