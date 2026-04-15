import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Aapka sahi Railway Live Link
  const API_URL = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Localhost ko badal kar live link laga diya
      const { data } = await axios.post(`${API_URL}/api/auth/login`, formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      if (data.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid Login');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ 
        mt: { xs: 6, md: 10 }, 
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
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth label="Email" variant="filled" margin="normal" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <TextField 
            fullWidth label="Password" type="password" variant="filled" margin="normal" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          <Button 
            fullWidth variant="contained" type="submit" 
            sx={{ 
              mt: 3, 
              py: 1.5, 
              bgcolor: 'white', 
              color: 'black', 
              fontWeight: 'bold',
              '&:hover': {bgcolor: '#ddd'} 
            }}
          >
            Sign In
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2, fontSize: '0.9rem', color: '#888' }}>
          New customer? <Link to="/register" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Create account</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
