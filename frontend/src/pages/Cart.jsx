import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box, Button, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // --- SAHI LIVE LINK YAHAN HAI ---
  const API_URL = "https://final-assigment-ecommerce.vercel.app";

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.product !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const placeOrder = async () => {
    if (!userInfo) return navigate('/login');
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      await axios.post(`${API_URL}/api/orders`, {
        orderItems: cartItems,
        totalPrice: totalPrice
      }, config);
      
      alert('Order Placed Successfully!');
      localStorage.removeItem('cartItems');
      navigate('/my-orders'); 

    } catch (err) { alert('Order Failed'); }
  };

  return (
    <Container sx={{ py: { xs: 4, md: 8 } }}>
      <Typography variant="h3" sx={{ 
        mb: 4, 
        fontWeight: 200, 
        fontSize: { xs: '2rem', md: '3rem' } 
      }}>
        Shopping <span style={{color: '#666'}}>Cart</span>
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="#666">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3} direction={{ xs: 'column-reverse', md: 'row' }}>
          
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Paper key={item.product} sx={{ 
                p: { xs: 1.5, md: 2 }, 
                mb: 2, 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                display: 'flex', 
                alignItems: 'center' 
              }}>
                <img 
                  
                  src={item.image.startsWith('/uploads') ? `${API_URL}${item.image}` : item.image} 
                  alt={item.name} 
                  style={{ width: 70, height: 70, borderRadius: 8, objectFit: 'cover' }} 
                />
                <Box sx={{ ml: { xs: 2, md: 3 }, flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="#888">
                    ${item.price} <span style={{ fontSize: '0.8rem' }}>x {item.qty}</span>
                  </Typography>
                </Box>
                <IconButton color="error" onClick={() => removeFromCart(item.product)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Paper>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ 
              p: { xs: 2.5, md: 3 }, 
              background: 'white', 
              color: 'black', 
              borderRadius: 4,
              position: { md: 'sticky' },
              top: { md: '100px' }
            }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Summary</Typography>
              <Divider sx={{ mb: 2, bgcolor: '#eee' }} />
              
              <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="body1">Total Items:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{cartItems.length}</Typography>
              </Box>
              
              <Box display="flex" justifyContent="space-between" sx={{ mb: 4 }}>
                <Typography variant="h6">Total Price:</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${totalPrice.toFixed(2)}</Typography>
              </Box>

             {/* /* <Button 
                fullWidth 
                variant="outlined" 
                sx={{ 
                  mb: 1.5, 
                  color: 'black', 
                  borderColor: 'black', 
                  fontWeight: 'bold',
                  py: 1.2
                }} 
                onClick={() => navigate('/add-card')}
              >
                Payment Method
              </Button> */}

              <Button 
                fullWidth 
                variant="contained" 
                sx={{ 
                  bgcolor: 'black', 
                  color: 'white', 
                  py: 1.5, 
                  fontWeight: 'bold',
                  '&:hover': {bgcolor: '#333'} 
                }} 
                onClick={placeOrder}
              >
                Checkout Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
