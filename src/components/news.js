import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import apiService from '../services/apiService';

const NewsComponent = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);

            try {
                const {data} = await apiService.getNews();
                if (data.feed) {
                    setNewsData(data.feed.sort(() => 0.5 - Math.random()).slice(0, 3));
                } else if (data.Information) {
                    setError(data.Information);
                } else {
                    setError('Failed to retrieve news data.');
                }
            } catch (err) {
                setError('Failed to retrieve news data.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Container>
            <Grid container spacing={4} justifyContent="center">
                {newsData.map((news, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <a href={news.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: '300px', height: '480px' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={news.banner_image}
                                    alt={news.title}
                                />
                                <CardContent sx={{ flexGrow: 1, overflowY: 'auto' }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {news.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {news.summary}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Source:</strong> {news.source} <br />
                                        <strong>Published:</strong> {new Date(news.time_published).toLocaleString()} <br />
                                        <strong>Sentiment:</strong> {news.overall_sentiment_label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </a>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default NewsComponent;
