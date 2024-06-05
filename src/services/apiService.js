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
  })
};

export default apiService;