import { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Select, MenuItem, FormControl, Paper, TableContainer } from '@mui/material';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  // --- SAHI LIVE LINK YAHAN HAI ---
  const API_URL = "https://final-assigment-ecommerce.vercel.app";

  const fetchOrders = async () => {
    // Railway live link set kiya gaya hai
    const { data } = await axios.get(`${API_URL}/api/orders`, config);
    setOrders(data);
  };

  useEffect(() => { fetchOrders(); }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#4caf50'; // Green
      case 'Cancelled': return '#f44336'; // Red
      case 'Pending': return '#ff9800';   // Orange
      case 'Shipped': return '#ffeb3b';   // Yellow
      default: return 'white';
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      // Railway live link set kiya gaya hai
      await axios.put(`${API_URL}/api/orders/${id}`, { status: newStatus }, config);
      alert('Order Status Updated!');
      fetchOrders(); 
    } catch (err) {
      alert('Status update fail ho gaya');
    }
  };

  return (
    <Container sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" sx={{ 
        mb: 4, 
        fontWeight: 200, 
        fontSize: { xs: '1.5rem', md: '2.125rem' } 
      }}>
        Manage <span style={{color: '#666'}}>Orders</span>
      </Typography>

      <TableContainer component={Paper} sx={{ 
        background: 'rgba(255,255,255,0.02)', 
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'none'
      }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ORDER ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>USER</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TOTAL</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell sx={{ color: '#ccc', fontSize: '0.85rem' }}>{order._id}</TableCell>
                <TableCell sx={{ color: '#ccc' }}>{order.user?.name}</TableCell>
                <TableCell sx={{ color: '#ccc' }}>${order.totalPrice}</TableCell>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: 130 }}>
                    <Select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      sx={{ 
                          color: getStatusColor(order.status), 
                          border: '1px solid #444',
                          fontWeight: 'bold',
                          fontSize: '0.85rem',
                          '.MuiOutlinedInput-notchedOutline': { border: 'none' }
                      }}
                    >
                      <MenuItem value="Pending" sx={{ color: '#ff9800' }}>Pending</MenuItem>
                      <MenuItem value="Shipped" sx={{ color: '#ffeb3b' }}>Shipped</MenuItem>
                      <MenuItem value="Delivered" sx={{ color: '#4caf50' }}>Delivered</MenuItem>
                      <MenuItem value="Cancelled" sx={{ color: '#f44336' }}>Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminOrders;
