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

// Helmet security headers including correct CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // default allow only self
        imgSrc: [
          "'self'",
          "http://54.157.201.9:4000", // allow images/favicons from backend
          "data:", // allow base64 images
        ],
        scriptSrc: [
          "'self'",
          "https://cdnjs.cloudflare.com", // allow CDN scripts
        ],
        styleSrc: [
          "'self'",
          "https://cdnjs.cloudflare.com", // allow CDN styles
          "'unsafe-inline'", // allow inline styles if needed
        ],
        connectSrc: [
          "'self'",
          "http://54.157.201.9:4000", // backend API calls
          "http://54.157.201.9:3000", // frontend dev server
        ],
        fontSrc: [
          "'self'",
          "https://cdnjs.cloudflare.com", // web fonts
        ],
      },
    },
  })
);

// JSON body parser
app.use(express.json());

// CORS for frontend
app.use(cors({ origin: ["http://localhost:3000", "http://54.157.201.9:3000"] }));

// Routes
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