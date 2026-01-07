const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const apiKeyAuth = require('./middleware/apiKeyAuth');

connectDB();

const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (API Key applied to /api routes)
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use('/api', apiKeyAuth);

// Ensure routes are mounted using /api prefix

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public')); // For serving static assets if needed

// Data Directory Check
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('MC Mobiles API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
