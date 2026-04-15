import { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // --- SAHI LIVE LINK YAHAN HAI ---
  const API_URL = "https://final-assigment-ecommerce.vercel.app";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Localhost ko badal kar live link laga diya
        const { data } = await axios.get(`${API_URL}/api/products`);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
      alert("Please login to add items to cart");
      navigate('/login');
      return;
    }

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existItem = cartItems.find(x => x.product === product._id);

    if (existItem) {
      cartItems = cartItems.map(x => 
        x.product === existItem.product ? { ...x, qty: x.qty + 1 } : x
      );
    } else {
      cartItems.push({ 
        product: product._id, 
        name: product.name, 
        image: product.image, 
        price: product.price, 
        qty: 1 
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${product.name} added to cart!`);
    window.location.reload(); 
  };

  return (
    <Container sx={{ py: { xs: 4, md: 8 } }}>
      <Typography variant="h3" sx={{ 
        mb: { xs: 4, md: 6 }, 
        fontWeight: 200, 
        letterSpacing: -1,
        fontSize: { xs: '2rem', md: '3rem' }
      }}>
        Discover <span style={{ color: '#666' }}>Collections</span>
      </Typography>
      
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              background: 'rgba(255, 255, 255, 0.03)', 
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              transition: 'all 0.3s ease-in-out',
              mx: { xs: 1, sm: 0 },
              '&:hover': { transform: 'translateY(-10px)', background: 'rgba(255, 255, 255, 0.06)' }
            }}>
              <CardMedia
                component="img"
                height="280"
                // --- Image Path Logic Update ki gayi hai live backend ke liye ---
                image={product.image.startsWith('/uploads') 
                  ? `${API_URL}${product.image}` 
                  : (product.image || 'https://placeholder.com')}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="overline" sx={{ color: '#666' }}>{product.category}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 400, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>{product.name}</Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">${product.price}</Typography>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
