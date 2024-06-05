import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import apiService from '../services/apiService';
import { FundContext } from '../contexts/FundContext';

function Query() {
  const [answer, setAnswer] = useState('');
  const { id } = useContext(FundContext);
  const [question, setQuestion] = useState(`Please give me some insights of ${id}`);

  const handleAsk = async () => {
    const response = await apiService.askGenAI(question);
    if (response?.code === 'ERR_BAD_RESPONSE') {
      setAnswer(response?.response?.data?.error);
    } else {
      setAnswer(response?.data?.answer);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      {/* <Typography gutterBottom>
        Ask a Question about {id} <Typography component="span" variant="body2" color="textSecondary">(Powered by OpenAI)</Typography>
      </Typography> */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
            variant="contained"
            color="primary"
            onClick={handleAsk}
            sx={{ paddingLeft: 4, paddingRight: 4, textTransform: 'none' }}
          >
          <Typography gutterBottom>Get insights of {id} <Typography component="span" variant="body2" color="textPrimary" sx={{ color: 'rgba(255, 255, 255, 0.7)', marginLeft: 1 }}>(Powered by OpenAI)
          </Typography></Typography></Button>
        {/* <TextField
          variant="outlined"
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          margin="normal"
          sx={{
            marginRight: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              backgroundColor: '#f0f0f0',
              '&.Mui-focused': {
                backgroundColor: '#fff',
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: '1rem',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAsk}
          sx={{ height: '56px', paddingLeft: 3, paddingRight: 3 }}
        >
          Ask
        </Button> */}
      </Box>
      {answer && (
        <Typography variant="body1" color="textSecondary" sx={{ marginTop: 1 }}>
          <strong>Answer:</strong> {answer}
        </Typography>
      )}
    </Container>
  );
}

export default Query;