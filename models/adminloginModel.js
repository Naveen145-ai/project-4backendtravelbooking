const mongoose = require('mongoose');

const adminloginSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        phone: { type: Number, required: true }
    }
);

const adminloginModel = mongoose.model('adminLogin', adminloginSchema);

module.exports = adminloginModel;

