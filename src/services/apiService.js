import axios from 'axios';
const apiEndPoint = 'http://127.0.0.1:5000/api';
const apiService = {
  getMutualFunds: () => axios.get(apiEndPoint + '/mutual-funds').catch(e => console.error(e)),
  askGenAI: (question) => axios.post(apiEndPoint + '/genai/ask', { question }).catch(e => {
    console.error(e);
    return e;
  }),
};

export default apiService;