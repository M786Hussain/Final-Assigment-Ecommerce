import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Badge, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const logout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload(); 
  };

  // --- Mobile Menu Layout (Drawer) ---
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: '#0a0a0a', height: '100%', color: 'white', pt: 3 }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 800 }}>AL-DEEN STORE</Typography>
      <List sx={{ px: 2 }}>
        <ListItem component={Link} to="/"><ListItemText primary="Shop" /></ListItem>
        <ListItem component={Link} to="/cart"><ListItemText primary={`Cart (${cartItems.length})`} /></ListItem>
        {userInfo ? (
          <>
            <ListItem component={Link} to="/my-orders"><ListItemText primary="My Orders" /></ListItem>
            {userInfo.isAdmin && (
              <>
                <ListItem component={Link} to="/admin" sx={{ color: '#90caf9' }}><ListItemText primary="Admin Dashboard" /></ListItem>
                <ListItem component={Link} to="/admin/orders" sx={{ color: '#90caf9' }}><ListItemText primary="Manage Orders" /></ListItem>
                {/* Manage Cards wala link yahan se hata diya gaya hai */}
              </>
            )}
            <ListItem onClick={logout} sx={{ color: '#ff4444' }}><ListItemText primary="Logout" /></ListItem>
          </>
        ) : (
          <>
            <ListItem component={Link} to="/login"><ListItemText primary="Login" /></ListItem>
            <ListItem component={Link} to="/register"><ListItemText primary="Register" /></ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <Container>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h5" component={Link} to="/" sx={{ 
            fontWeight: 800, textDecoration: 'none', color: 'white', 
            fontSize: { xs: '1.1rem', sm: '1.5rem' }, flexGrow: { xs: 1, sm: 0 }
          }}>
            AL-DEEN<span style={{ color: '#555' }}>SHOP</span>
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Button color="inherit" component={Link} to="/">Shop</Button>
            <Button color="inherit" component={Link} to="/cart" startIcon={
              <Badge badgeContent={cartItems.length} color="error"><ShoppingCartIcon /></Badge>
            }>Cart</Button>

            {userInfo ? (
              <>
                <Button color="inherit" component={Link} to="/my-orders">My Orders</Button>
                {userInfo.isAdmin && (
                  <>
                    <Button color="primary" component={Link} to="/admin" sx={{ fontWeight: 'bold' }}>Dashboard</Button>
                    <Button color="inherit" component={Link} to="/admin/orders">Orders</Button>
                    {/* Cards wala button yahan se remove kar diya hai */}
                  </>
                )}
                <Button color="inherit" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button variant="outlined" component={Link} to="/register" sx={{ ml: 1, borderColor: 'white', color: 'white' }}>Register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, background: '#0a0a0a' },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
