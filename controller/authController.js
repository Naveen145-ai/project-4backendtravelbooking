const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Ensure all fields are provided
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

    res.status(201).json({ success: true, message: "User registered successfully!", data: newUser });
  } catch (error) {
    console.error("Registration Error:", error); // Log error for debugging
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};