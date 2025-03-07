const loginModel = require('../models/loginModel');

exports.createLogin = async (req, res) => {
    try {
        const { email, phone } = req.body;
        if (!email || !phone) {
            return res.status(400).json({ success: false, message: "Email and phone are required." });
        }

        const newLogin = await loginModel.create({ email, phone });

        res.status(201).json({
            success: true,
            message: "Login created successfully",
            data: newLogin
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

