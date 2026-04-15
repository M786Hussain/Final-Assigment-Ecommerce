const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Routes Imports (CardRoutes yahan se hata diya gaya hai)
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); 

const dns = require("node:dns/promises")
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Uploads folder ko static banana taake images browser mein dikhen
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => res.send('API is running...'));

// Routes API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
