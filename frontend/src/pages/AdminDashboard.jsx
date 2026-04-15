import { useEffect, useState } from 'react';
import { 
  Container, Typography, Button, Table, TableBody, TableCell, 
  TableHead, TableRow, Box, Modal, TextField, Paper, TableContainer 
} from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '', category: '', countInStock: 0 });

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  // --- SAHI LIVE LINK YAHAN HAI ---
 const API_URL = "http://localhost:5000";

  const fetchProducts = async () => {
    // Railway live link set kiya gaya hai
    const { data } = await axios.get(`${API_URL}/api/products`);
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append('image', file);
    setUploading(true);

    try {
      // Railway live link set kiya gaya hai
      const { data } = await axios.post(`${API_URL}/api/upload`, uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, image: data });
      setUploading(false);
      alert('Image Uploaded Successfully!');
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert('Upload failed');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Railway live link set kiya gaya hai
      await axios.delete(`${API_URL}/api/products/${id}`, config);
      fetchProducts();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Railway live link set kiya gaya hai
      await axios.post(`${API_URL}/api/products`, formData, config);
      setOpen(false);
      fetchProducts();
      setFormData({ name: '', price: '', description: '', image: '', category: '', countInStock: 0 });
    } catch (err) { alert("Error adding product"); }
  };

  return (
    <Container sx={{ py: { xs: 3, md: 5 } }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        gap: 2,
        mb: 4 
      }}>
        <Typography variant="h4" fontWeight="200" sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
          Admin <span style={{color: '#666'}}>Dashboard</span>
        </Typography>
        <Button variant="contained" sx={{ bgcolor: 'white', color: 'black', width: { xs: '100%', sm: 'auto' } }} onClick={() => setOpen(true)}>
          Add New Product
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>NAME</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>PRICE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CATEGORY</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id}>
                <TableCell sx={{ color: '#ccc' }}>{p.name}</TableCell>
                <TableCell sx={{ color: '#ccc' }}>${p.price}</TableCell>
                <TableCell sx={{ color: '#ccc' }}>{p.category}</TableCell>
                <TableCell>
                  <Button color="error" size="small" onClick={() => deleteHandler(p._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 }, 
          maxHeight: '90vh',
          overflowY: 'auto', 
          bgcolor: '#111', border: '1px solid #333', boxShadow: 24, p: { xs: 2, md: 4 }, borderRadius: 3
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>Add New Product</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Product Name" variant="filled" margin="dense" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <TextField fullWidth label="Price" variant="filled" margin="dense" type="number" onChange={(e) => setFormData({...formData, price: e.target.value})} />
            
            <TextField fullWidth label="Image Path" variant="filled" margin="dense" value={formData.image} disabled />
            <Typography variant="caption" sx={{ color: '#888', mt: 1, display: 'block' }}>Upload from System:</Typography>
            <input type="file" onChange={uploadFileHandler} style={{ marginTop: '5px', marginBottom: '15px', color: 'white', width: '100%' }} />
            {uploading && <Typography variant="caption" color="primary">Uploading...</Typography>}

            <TextField fullWidth label="Category" variant="filled" margin="dense" onChange={(e) => setFormData({...formData, category: e.target.value})} />
            <TextField fullWidth label="Description" variant="filled" margin="dense" multiline rows={2} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 3, bgcolor: 'white', color: 'black' }} disabled={uploading}>
              Save Product
            </Button>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
