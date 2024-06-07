import React, { useState, useContext, useEffect, useRef } from 'react';
import { Container, Typography, Tabs, Tab, Box, Grid } from '@mui/material';
import { createChart } from 'lightweight-charts';
import apiService from '../services/apiService';
import { FundContext } from '../contexts/FundContext';
import Query from './query';
import Analysis from './analysis';

const FundDetail = () => {
  const { fundDetail, id, setOverview, overview } = useContext(FundContext);
  const [tabIndex, setTabIndex] = useState(0);
  const candlestickChartContainerRef = useRef();
  const histogramContainerRef = useRef();
  const areaChartContainerRef = useRef();
  const candlestickSeriesRef = useRef();
  const histogramSeriesRef = useRef();
  const areaSeriesRef = useRef();
  const candlestickChartRef = useRef();
  const histogramChartRef = useRef();
  const areaChartRef = useRef();

  useEffect(() => {
    if (fundDetail && fundDetail.length) {
      const sortedData = [...fundDetail].sort((a, b) => new Date(a.time) - new Date(b.time));
      const data = sortedData.map(item => ({
        time: item.time,
        value: parseFloat(item.close),
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close)
      }));

      if (!candlestickSeriesRef.current) {
        candlestickChartRef.current = createChart(candlestickChartContainerRef.current, { width: candlestickChartContainerRef.current.clientWidth, height: 430 });
        candlestickSeriesRef.current = candlestickChartRef.current.addCandlestickSeries();
      }
      candlestickSeriesRef.current.setData(data.map(({ time, open, high, low, close }) => ({ time, open, high, low, close })));

      if (!histogramSeriesRef.current) {
        histogramChartRef.current = createChart(histogramContainerRef.current, { width: histogramContainerRef.current.clientWidth, height: 220 });
        histogramSeriesRef.current = histogramChartRef.current.addHistogramSeries();
      }
      histogramSeriesRef.current.setData(data.map(({ time, value }) => ({ time, value })));

      if (!areaSeriesRef.current) {
        areaChartRef.current = createChart(areaChartContainerRef.current, { width: areaChartContainerRef.current.clientWidth, height: 220 });
        areaSeriesRef.current = areaChartRef.current.addAreaSeries();
      }
      areaSeriesRef.current.setData(data.map(({ time, value }) => ({ time, value })));
    }

    return () => {
      if (candlestickChartRef.current) {
        candlestickChartRef.current.remove();
        candlestickChartRef.current = null;
        candlestickSeriesRef.current = null;
      }
      if (histogramChartRef.current) {
        histogramChartRef.current.remove();
        histogramChartRef.current = null;
        histogramSeriesRef.current = null;
      }
      if (areaChartRef.current) {
        areaChartRef.current.remove();
        areaChartRef.current = null;
        areaSeriesRef.current = null;
      }
    };
  }, [fundDetail]);

  useEffect(() => {
    if (tabIndex === 0) {
      if (candlestickChartRef.current) {
        candlestickChartRef.current.resize(candlestickChartContainerRef.current.clientWidth, 430);
      }
      if (histogramChartRef.current) {
        histogramChartRef.current.resize(histogramContainerRef.current.clientWidth, 220);
      }
      if (areaChartRef.current) {
        areaChartRef.current.resize(areaChartContainerRef.current.clientWidth, 220);
      }
    }
  }, [tabIndex]);

  useEffect(() => {
    if (tabIndex === 1 && !overview) {
      apiService.getFundAnalysis(id)
        .then(response => setOverview(response.data))
        .catch(error => console.error('Error fetching analysis:', error));
    }
  }, [id, tabIndex, overview]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{id} Fund Detail</Typography>
      <Query />
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Charts" />
        <Tab label="Analysis" />
      </Tabs>
      {tabIndex === 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mb: 4 }}>
            <div ref={candlestickChartContainerRef} style={{ width: '100%', height: '400px' }}></div>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div ref={histogramContainerRef} style={{ width: '100%', height: '200px' }}></div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div ref={areaChartContainerRef} style={{ width: '100%', height: '200px' }}></div>
            </Grid>
          </Grid>
        </Box>
      )}
      {tabIndex === 1 && (
        !overview ? <Typography>Loading...</Typography> : (
            <Analysis />
        )
      )}
    </Container>
  );
};

export default FundDetail;