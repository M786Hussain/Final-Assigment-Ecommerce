import { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Divider, Stack } from '@mui/material';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Aapka sahi Railway Live Link
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        if (!userInfo) return;
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
        // Localhost ko badal kar live link laga diya
        const { data } = await axios.get(`${API_URL}/api/orders/user/${userInfo._id}`, config);
        setOrders(data);
      } catch (err) {
        console.error("Orders load nahi ho sakay:", err);
      }
    };
    fetchMyOrders();
  }, []);

  return (
    <Container sx={{ py: { xs: 4, md: 5 } }}>
      <Typography variant="h4" sx={{ 
        mb: 4, 
        fontWeight: 200, 
        fontSize: { xs: '1.8rem', md: '2.125rem' } 
      }}>
        My <span style={{color: '#666'}}>Orders</span>
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="h6" color="#555">Abhi tak koi order nahi mila.</Typography>
      ) : (
        orders.map(order => (
          <Paper key={order._id} sx={{ 
            p: { xs: 2, md: 3 }, 
            mb: 3, 
            background: 'rgba(255,255,255,0.02)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: 3 
          }}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              justifyContent="space-between" 
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={1}
            >
              <Typography variant="subtitle2" color="#888" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                Order ID: {order._id}
              </Typography>
              <Typography variant="body2" sx={{ 
                px: 2, py: 0.5, borderRadius: 2, 
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                bgcolor: order.status === 'Delivered' ? 'rgba(0,255,0,0.1)' : 'rgba(255,165,0,0.1)',
                color: order.status === 'Delivered' ? '#4caf50' : '#ff9800',
                fontWeight: 'bold'
              }}>
                {order.status}
              </Typography>
            </Stack>

            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.05)' }} />

            <Typography variant="h6" sx={{ mb: 1, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              Total Amount: ${order.totalPrice}
            </Typography>
            
            <Typography variant="body2" color="#666" sx={{ fontSize: '0.8rem' }}>
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default MyOrders;
