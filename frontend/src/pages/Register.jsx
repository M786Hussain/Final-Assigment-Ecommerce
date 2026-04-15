import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  // Aapka sahi Railway Live Link
  const API_URL = "https://final-assigment-ecommerce.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Localhost ko badal kar live link laga diya
      const { data } = await axios.post(`${API_URL}/api/auth/register`, formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
      window.location.reload(); 
    } catch (err) { 
      alert(err.response?.data?.message || "Registration Failed"); 
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ 
        mt: { xs: 4, md: 10 }, 
        p: { xs: 3, md: 4 },  
        borderRadius: 4, 
        border: '1px solid rgba(255,255,255,0.1)', 
        background: 'rgba(255,255,255,0.02)',
        mx: { xs: 1, md: 'auto' } 
      }}>
        <Typography variant="h4" align="center" sx={{ 
          mb: 3, 
          fontWeight: 200,
          fontSize: { xs: '1.8rem', md: '2.125rem' } 
        }}>
          Join Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth label="Name" variant="filled" margin="normal" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <TextField 
            fullWidth label="Email" variant="filled" margin="normal" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <TextField 
            fullWidth label="Password" type="password" variant="filled" margin="normal" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />

          <Button fullWidth variant="contained" type="submit" sx={{ 
            mt: 3, 
            py: 1.5, 
            bgcolor: 'white', 
            color: 'black', 
            fontWeight: 'bold',
            '&:hover': {bgcolor: '#ddd'} 
          }}>
            Create Account
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2, fontSize: '0.9rem', color: '#888' }}>
          Already have an account? <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
