import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Box, Tabs, Tab } from '@mui/material';
import { createChart } from 'lightweight-charts';
import apiService from '../services/apiService';
import { FundContext } from '../contexts/FundContext';

const FundDetail = () => {
    const { fundDetail, id } = useContext(FundContext);
    const [analysis, setAnalysis] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const areaChartContainerRef = useRef();
    const candlestickChartContainerRef = useRef();
    const histogramContainerRef = useRef();
    const areaSeriesRef = useRef();
    const candlestickSeriesRef = useRef();
    const histogramSeriesRef = useRef();
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
            if (!histogramSeriesRef.current) {
                const hist = createChart(histogramContainerRef.current, { width: 400, height: 300 });
                histogramSeriesRef.current = hist.addHistogramSeries();
            }
            histogramSeriesRef.current.setData(data.map(({ time, value }) => ({ time, value })));

            if (!areaSeriesRef.current) {
                const areaChart = createChart(areaChartContainerRef.current, { width: 400, height: 300 });
                areaSeriesRef.current = areaChart.addAreaSeries();
            }
            areaSeriesRef.current.setData(data.map(({ time, value }) => ({ time, value })));

            if (!candlestickSeriesRef.current) {
                const candlestickChart = createChart(candlestickChartContainerRef.current, { width: 400, height: 300 });
                candlestickSeriesRef.current = candlestickChart.addCandlestickSeries();
            }
            candlestickSeriesRef.current.setData(data.map(({ time, open, high, low, close }) => ({ time, open, high, low, close })));
        }
    }, [fundDetail, fundDetail.length]);

    useEffect(() => {
        if (tabIndex === 1 && !analysis) {
            apiService.getFundAnalysis(id)
                .then(response => setAnalysis(response.data))
                .catch(error => console.error('Error fetching analysis:', error));
        }
    }, [id, tabIndex, analysis]);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>{id} Fund Detail</Typography>
            <Tabs value={tabIndex} onChange={handleChange}>
                <Tab label="Charts" />
                <Tab label="Analysis" />
            </Tabs>
            {tabIndex === 0 && (
                <Box>
                    <div ref={histogramContainerRef}></div>
                    <div ref={areaChartContainerRef}></div>
                    <div ref={candlestickChartContainerRef}></div>
                </Box>
            )}
            {tabIndex === 1 && (
                !analysis ? <Typography>Loading...</Typography> : (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Historical Performance</Typography>
                            <Typography variant="body2">{analysis.performance}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Risk Analysis</Typography>
                            <Typography variant="body2">{analysis.risk}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Comparison</Typography>
                            <Typography variant="body2">{analysis.comparison}</Typography>
                        </Grid>
                    </Grid>
                )
            )}
        </Container>
    );
};

export default FundDetail;