const adminloginModel = require('../models/adminloginModel');

const ADMIN_CREDENTIALS = {
    email: "admin@example.com", // Set your admin email
    phone: "1234567890" // Set your admin phone number
};

exports.adminLogin = async (req, res) => {
    try {
        const { email, phone } = req.body;

        if (!email || !phone) {
            return res.status(400).json({ success: false, message: "Email and phone are required." });
        }

        // Validate admin credentials
        if (email !== ADMIN_CREDENTIALS.email || phone !== ADMIN_CREDENTIALS.phone) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid admin credentials" });
        }

        // If credentials match, allow admin login
        res.status(200).json({
            success: true,
            message: "Admin login successful",
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


console.log("adminloginController.js loaded");
console.log("adminloginController.js loaded");

console.log("hello");
