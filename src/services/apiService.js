import axios from 'axios';

const apiEndPoint = 'http://127.0.0.1:5000/api';
const apiService = {
  getMutualFunds: async id => await axios.post(`${apiEndPoint}/funds`, { id }).catch(e => {
    console.error(e);
    return e;
  }),
  askGenAI: async question => await axios.post(`${apiEndPoint}/genai/ask`, { question }).catch(e => {
    console.error(e);
    return e;
  }),
  getFundAnalysis: async id => await axios.post(`${apiEndPoint}/funds/analysis`, { id }).catch(e => {
    console.error(e);
    return e;
  }),
  getNews: async () => {
    const tickers = 'AAPL,GOOG';
    const time_from = '20230101T0000';
    const time_to = '20231231T2359';
    const sort = 'LATEST';
    const limit = 50;

    const params = {
      tickers,
      time_from,
      time_to,
      sort,
      limit
    };

    return await axios.get(`${apiEndPoint}/news`, { params }).catch(e => {
      console.error(e);
      return e;
    });
  }
};

export default apiService;