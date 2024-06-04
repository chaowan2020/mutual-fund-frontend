import React, { useState } from 'react';
import apiService from '../services/apiService';

function Query() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    // const response = await apiService.askGenAI(question);
    const response = await apiService.getMutualFunds(question);
    console.log(response, 10000, response?.code)
    if(response?.code === 'ERR_BAD_RESPONSE') {
        setAnswer(response?.response?.data?.error);
    } else {
        setAnswer(response?.data?.answer);
    }
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAsk}>Ask</button>
      {answer && <p>Answer: {answer}</p>}
    </div>
  );
}

export default Query;