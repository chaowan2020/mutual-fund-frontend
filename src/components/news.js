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
                // const {data} = await apiService.getNews();
                const data = {
                    "feed": [
                        {
                            "authors": [
                                "Stephen Graves"
                            ],
                            "banner_image": "https://cdn.decrypt.co/resize/1024/height/512/wp-content/uploads/2024/03/tigran-gambaryan-binance-gID_7.jpg",
                            "category_within_source": "n/a",
                            "overall_sentiment_label": "Somewhat-Bearish",
                            "overall_sentiment_score": -0.311632,
                            "source": "Decrypt.co",
                            "source_domain": "decrypt.co",
                            "summary": "House members urged \"immediate action\" in the case of Binance exec Tigran Gambaryan, arguing that his \"health and well-being are in danger.\" ...",
                            "ticker_sentiment": [],
                            "time_published": "20240605T112858",
                            "title": "U.S. Lawmakers Urge Biden to Rescue 'Hostage' Binance Exec From Detention in Nigeria",
                            "topics": [
                                {
                                    "relevance_score": "0.158519",
                                    "topic": "Blockchain"
                                }
                            ],
                            "url": "https://decrypt.co/233927/us-lawmakers-biden-binance-exec-nigeria"
                        },
                        {
                            "authors": [
                                "Inc.",
                                "Ollie's Bargain Outlet Holdings"
                            ],
                            "banner_image": "https://ml.globenewswire.com/Resource/Download/188af6b4-92ab-496a-b2dd-3bc783e2f543",
                            "category_within_source": "n/a",
                            "overall_sentiment_label": "Somewhat-Bullish",
                            "overall_sentiment_score": 0.339302,
                            "source": "GlobeNewswire",
                            "source_domain": "www.globenewswire.com",
                            "summary": "John Swygert to Transition to Executive Chairman in Early ...",
                            "ticker_sentiment": [
                                {
                                    "relevance_score": "0.039033",
                                    "ticker": "HD",
                                    "ticker_sentiment_label": "Neutral",
                                    "ticker_sentiment_score": "0.055043"
                                },
                                {
                                    "relevance_score": "0.039033",
                                    "ticker": "RLBD",
                                    "ticker_sentiment_label": "Somewhat-Bullish",
                                    "ticker_sentiment_score": "0.171622"
                                },
                                {
                                    "relevance_score": "0.116725",
                                    "ticker": "OLLI",
                                    "ticker_sentiment_label": "Neutral",
                                    "ticker_sentiment_score": "0.050161"
                                }
                            ],
                            "time_published": "20240605T112800",
                            "title": "Ollie's Bargain Outlet Announces Executive Promotions and Appointments as Part of Anticipated Leadership Succession",
                            "topics": [
                                {
                                    "relevance_score": "0.495866",
                                    "topic": "Earnings"
                                },
                                {
                                    "relevance_score": "1.0",
                                    "topic": "Retail & Wholesale"
                                }
                            ],
                            "url": "https://www.globenewswire.com/news-release/2024/06/05/2893758/36273/en/Ollie-s-Bargain-Outlet-Announces-Executive-Promotions-and-Appointments-as-Part-of-Anticipated-Leadership-Succession.html"
                        },
                        {
                            "authors": [
                                "Globe Newswire"
                            ],
                            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
                            "category_within_source": "News",
                            "overall_sentiment_label": "Somewhat-Bullish",
                            "overall_sentiment_score": 0.267885,
                            "source": "Benzinga",
                            "source_domain": "www.benzinga.com",
                            "summary": "VANCOUVER, British Columbia, June 05, 2024 ( GLOBE NEWSWIRE ) -- Fortuna Silver Mines Inc. FVI FSM ( \"Fortuna\" or the \"Company\" ) announces that it is offering convertible senior notes due 2029 ( the \"Notes\" ) in an aggregate principal amount of US$150 million ( the \"Offering\" ) .",
                            "ticker_sentiment": [
                                {
                                    "relevance_score": "0.197413",
                                    "ticker": "FSM",
                                    "ticker_sentiment_label": "Somewhat-Bullish",
                                    "ticker_sentiment_score": "0.242749"
                                },
                                {
                                    "relevance_score": "0.148731",
                                    "ticker": "SLVMF",
                                    "ticker_sentiment_label": "Somewhat-Bullish",
                                    "ticker_sentiment_score": "0.201165"
                                }
                            ],
                            "time_published": "20240605T110517",
                            "title": "Fortuna Announces Offering of Convertible Senior Notes - Fortuna Silver Mines  ( NYSE:FSM ) ",
                            "topics": [
                                {
                                    "relevance_score": "0.158519",
                                    "topic": "Economy - Monetary"
                                },
                                {
                                    "relevance_score": "1.0",
                                    "topic": "Energy & Transportation"
                                },
                                {
                                    "relevance_score": "0.904684",
                                    "topic": "Financial Markets"
                                }
                            ],
                            "url": "https://www.benzinga.com/pressreleases/24/06/g39180224/fortuna-announces-offering-of-convertible-senior-notes"
                        },
                        {
                            "authors": [
                                "Fortuna Silver Mines Inc."
                            ],
                            "banner_image": "https://ml.globenewswire.com/Resource/Download/cfe95c90-620b-4c8a-9899-d8adcd805f1e",
                            "category_within_source": "n/a",
                            "overall_sentiment_label": "Somewhat-Bullish",
                            "overall_sentiment_score": 0.26561,
                            "source": "GlobeNewswire",
                            "source_domain": "www.globenewswire.com",
                            "summary": "VANCOUVER, British Columbia, June 05, 2024 ( GLOBE NEWSWIRE ) -- Fortuna Silver Mines Inc. ( TSX: FVI ) ( NYSE: FSM ) ( \"Fortuna\" or the \"Company\" ) announces that it is offering convertible senior notes due 2029 ( the \"Notes\" ) in an aggregate principal amount of US$150 million ( the \"Offering\" ...",
                            "ticker_sentiment": [
                                {
                                    "relevance_score": "0.158173",
                                    "ticker": "FSM",
                                    "ticker_sentiment_label": "Somewhat-Bullish",
                                    "ticker_sentiment_score": "0.227117"
                                },
                                {
                                    "relevance_score": "0.105836",
                                    "ticker": "SLVMF",
                                    "ticker_sentiment_label": "Somewhat-Bullish",
                                    "ticker_sentiment_score": "0.187701"
                                }
                            ],
                            "time_published": "20240605T110500",
                            "title": "Fortuna Announces Offering of Convertible Senior Notes",
                            "topics": [
                                {
                                    "relevance_score": "0.158519",
                                    "topic": "Economy - Monetary"
                                },
                                {
                                    "relevance_score": "1.0",
                                    "topic": "Energy & Transportation"
                                },
                                {
                                    "relevance_score": "0.838487",
                                    "topic": "Financial Markets"
                                }
                            ],
                            "url": "https://www.globenewswire.com/news-release/2024/06/05/2893752/0/en/Fortuna-Announces-Offering-of-Convertible-Senior-Notes.html"
                        }
                    ],
                    "items": "50",
                    "relevance_score_definition": "0 < x <= 1, with a higher score indicating higher relevance.",
                    "sentiment_score_definition": "x <= -0.35: Bearish; -0.35 < x <= -0.15: Somewhat-Bearish; -0.15 < x < 0.15: Neutral; 0.15 <= x < 0.35: Somewhat_Bullish; x >= 0.35: Bullish"
                }
                console.log(17777, data);
                if (data.feed) {
                    //   setNewsData(data.feed.slice(0, 3));
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
