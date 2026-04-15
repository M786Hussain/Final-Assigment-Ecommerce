import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCard = () => {
  const [formData, setFormData] = useState({ cardHolderName: '', cardNumber: '', expiryDate: '', cvv: '' });
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Aapka sahi Railway Live Link
  const API_URL = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      // Localhost ko badal kar live link laga diya
      await axios.post(`${API_URL}/api/cards`, formData, config);
      alert('Card Saved Successfully!');
      navigate('/cart'); 
    } catch (err) { alert('Failed to save card'); }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ 
        mt: { xs: 4, md: 10 }, 
        p: { xs: 3, md: 4 },  
        borderRadius: 4, 
        background: 'rgba(255,255,255,0.02)', 
        border: '1px solid rgba(255,255,255,0.1)' 
      }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 200, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
          Payment <span style={{color:'#666'}}>Method</span>
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Card Holder Name" variant="filled" margin="normal" onChange={(e) => setFormData({...formData, cardHolderName: e.target.value})} required />
          <TextField fullWidth label="Card Number" variant="filled" margin="normal" inputProps={{ maxLength: 16 }} onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} required />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField fullWidth label="MM/YY" variant="filled" margin="normal" onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} required />
            <TextField fullWidth label="CVV" type="password" variant="filled" margin="normal" inputProps={{ maxLength: 3 }} onChange={(e) => setFormData({...formData, cvv: e.target.value})} required />
          </Box>
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 3, py: 1.5, bgcolor: 'white', color: 'black', fontWeight: 'bold', '&:hover': {bgcolor: '#ddd'} }}>
            Save Card Details
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddCard;
