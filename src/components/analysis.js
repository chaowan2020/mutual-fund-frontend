import React, { useContext } from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { FundContext } from '../contexts/FundContext';

const Analysis = () => {
    const { overview } = useContext(FundContext);
    let data;
    try {
        data = overview;
    } catch (error) {
        console.error('Failed to parse overview:', error);
        data = null;
    }

    if (!data || typeof data !== 'object' || data.Information) {
        return (
            <Typography variant="body1" color="error">
                Failed to load data. Please check the API response or try again later.
            </Typography>
        );
    }

    const analysis = {
        performance: [
            { label: "52-Week High", value: data["52WeekHigh"], type: 'positive' },
            { label: "52-Week Low", value: data["52WeekLow"], type: 'negative' },
            { label: "200-Day Moving Average", value: data["200DayMovingAverage"], type: 'neutral' },
            { label: "50-Day Moving Average", value: data["50DayMovingAverage"], type: 'neutral' },
            { label: "Latest Quarter", value: data["LatestQuarter"], type: 'neutral' },
        ],
        risk: [
            { label: "Beta", value: data.Beta, type: data.Beta > 1 ? 'negative' : 'positive' },
            { label: "PE Ratio", value: data.PERatio, type: data.PERatio > 20 ? 'negative' : 'positive' },
            { label: "PEG Ratio", value: data.PEGRatio, type: data.PEGRatio > 1 ? 'negative' : 'positive' },
            { label: "Dividend Yield", value: data.DividendYield, type: 'positive' },
        ],
        comparison: [
            { label: "Analyst Target Price", value: data.AnalystTargetPrice, type: 'neutral' },
            { label: "Buy", value: data.AnalystRatingBuy, type: 'positive' },
            { label: "Hold", value: data.AnalystRatingHold, type: 'neutral' },
            { label: "Sell", value: data.AnalystRatingSell, type: 'negative' },
            { label: "Strong Buy", value: data.AnalystRatingStrongBuy, type: 'positive' },
            { label: "Strong Sell", value: data.AnalystRatingStrongSell, type: 'negative' },
            { label: "Return on Assets", value: data.ReturnOnAssetsTTM, type: 'positive' },
            { label: "Return on Equity", value: data.ReturnOnEquityTTM, type: 'positive' },
        ],
        overview: [
            { label: "Country", value: data.Country },
            { label: "Sector", value: data.Sector },
            { label: "Fiscal Year End", value: data.FiscalYearEnd },
            { label: "Industry", value: data.Industry },
            { label: "Market Capitalization", value: data.MarketCapitalization },
            { label: "Shares Outstanding", value: data.SharesOutstanding },
            { label: "Exchange", value: data.Exchange },
            { label: "Asset Type", value: data.AssetType },
        ],
    };

    const getColor = (type) => {
        switch (type) {
            case 'positive':
                return 'green';
            case 'negative':
                return 'red';
            default:
                return 'black';
        }
    };

    const CompanyOverview = () => (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Card sx={{ margin: 0.5 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Overview
                        </Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                        <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>Description:</Typography>
                        <Typography sx={{ color: 'black' }}>{data.Description}</Typography>
                        </Grid>
                            {analysis.overview.map((item, index) => (
                                <Grid item xs={6} sm={3} key={index}>
                                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>{item.label}:</Typography>
                                    <Typography sx={{ color: 'black' }}>{item.value}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ margin: 0.5 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Historical Performance
                        </Typography>
                        <Grid container spacing={2}>
                            {analysis.performance.map((item, index) => (
                                <Grid item xs={6} sm={4} key={index}>
                                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>{item.label}:</Typography>
                                    <Typography sx={{ color: getColor(item.type) }}>{item.value}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ margin: 0.5 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Risk Analysis
                        </Typography>
                        <Grid container spacing={2}>
                            {analysis.risk.map((item, index) => (
                                <Grid item xs={6} sm={4} key={index}>
                                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>{item.label}:</Typography>
                                    <Typography sx={{ color: getColor(item.type) }}>{item.value}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ margin: 0.5 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Comparison
                        </Typography>
                        <Grid container spacing={2}>
                            {analysis.comparison.map((item, index) => (
                                <Grid item xs={6} sm={4} key={index}>
                                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>{item.label}:</Typography>
                                    <Typography sx={{ color: getColor(item.type) }}>{item.value}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );

    return <CompanyOverview />;
};

export default Analysis;
