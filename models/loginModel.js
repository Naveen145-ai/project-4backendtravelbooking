const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        phone: { type: Number, required: true }
    }
);

const loginModel = mongoose.model('Login', loginSchema);

module.exports = loginModel;
