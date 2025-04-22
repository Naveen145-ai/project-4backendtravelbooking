const User = require("../models/User");
const nodemailer = require('nodemailer');
const randomize = require('randomatic'); // Used to generate random OTP

// Create the transporter for Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use false for TLS
  auth: {
    user: 'naveensrinivas145@gmail.com', // Your Gmail address
    pass: 'vpsjjlbyksoswnyy' // Your Gmail App Password
  }
});

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered." });
    }

    // Create new user
    const newUser = await User.create({ name, email, phone });

    // Generate OTP
    const otp = randomize('0', 6); // Generate a 6-digit OTP

    // Send OTP to email
    const mailOptions = {
      from: 'naveensrinivas145@gmail.com', // Sender address
      to: email, // Recipient
      subject: 'Your OTP for Registration',
      html: `<p>Your OTP for registration is: <strong>${otp}</strong></p>`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
      }

      // Store OTP and email in memory or database for verification
      // For simplicity, we'll store them in memory here (you can store them in a database)
      req.app.locals.otp = otp;
      req.app.locals.email = email;

      res.status(201).json({ success: true, message: "User registered successfully! OTP sent to email." });
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


exports.verifyOtp = (req, res) => {
  const { otp } = req.body;
  const { email } = req.app.locals; // Retrieve the stored email for OTP validation

  if (!otp) {
    return res.status(400).json({ success: false, message: "OTP is required." });
  }

  // Verify if the entered OTP matches the one sent to the user
  if (otp === req.app.locals.otp) {
    // OTP verified successfully
    return res.status(200).json({ success: true, message: "OTP verified successfully!" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP." });
  }
};
