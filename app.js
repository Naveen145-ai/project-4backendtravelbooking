const express = require('express');
const app = express();
const path = require('path');
const connectDatabase = require('./config/connectDatabase');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet'); 
const adminRoutes = require('./routes/admin');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const products = require('./routes/product');
const orders = require('./routes/order');

const logins = require('./routes/login');
const adminlogins = require('./routes/adminlogin');
const authRoutes = require("./routes/auth"); 

connectDatabase();

// Helmet security headers - permissive CSP for development
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for development
  })
);

// CORS for frontend - allow all origins in development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// JSON body parser
app.use(express.json());

// CORS for frontend
app.use(cors({ origin: ["http://localhost:3000", "http://54.157.201.9:3000"] }));

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the MERN API',
    api_documentation: '/api/v1',
    status: 'Server is running'
  });
});

// API Routes
app.use('/api/v1/', products);
app.use('/api/v1/', orders);
app.use('/api/v1/', logins);
app.use('/api/v1/', adminlogins);
app.use('/api/v1/', authRoutes); 
app.use('/api/v1/admin', adminRoutes); 

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});

// Debug logs
console.log("hi");
console.log("heelo");
console.log("hello");
console.log("heloo");