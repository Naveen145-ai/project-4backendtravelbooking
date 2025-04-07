const express = require('express');
const app = express();
const path = require('path');
const connectDatabase = require('./config/connectDatabase');
const dotenv = require('dotenv');
const cors = require('cors');
const adminRoutes = require('./routes/admin');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const products = require('./routes/product');
const orders = require('./routes/order');

const logins = require('./routes/login');
const adminlogins = require('./routes/adminlogin');
const authRoutes = require("./routes/auth"); // Import user routes

connectDatabase();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use('/api/v1/', products);
app.use('/api/v1/', orders);

app.use('/api/v1/', logins);
app.use('/api/v1/', adminlogins);
app.use('/api/v1/', authRoutes); 
app.use('/api/v1/admin', adminRoutes); // Register route

app.listen(process.env.PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});


/*var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Naveen',
    pass: 'hellomail'
  }
});

var mailOptions = {
  from: 'naveensrinivasv.23cse@kongu.edu',
  to: 'rithishr.23cse@kongu.edu',
  subject: 'Sending Email using Node.js',
  text: 'This is the emaio sent for learning!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
*/