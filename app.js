const express = require('express');
const app = express();
const path = require('path');
const connectDatabase = require('./config/connectDatabase');
const dotenv = require('dotenv');
const cors = require('cors');
 dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

 const products = require('./routes/product');
 const orders = require('./routes/order');
 const notifyRoutes = require("./routes/notify");
 const logins = require('./routes/login');

 connectDatabase();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
 app.use('/api/v1/',products);
 app.use('/api/v1/',orders);
 app.use('/api/notifications', notifyRoutes);
 app.use('/api/v1/',logins);

app.listen(process.env.PORT, () => {
    console.log(`server is ${process.env.NODE_ENV} in the ${process.env.PORT}`);
});

