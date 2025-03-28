const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            qty: { type: Number, required: true },
            category: { type: String, required: true } // Added age category field
        }
    ],
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;






/*const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        cartItems:Array,
        amount: String,
        status: String,
        createdAt: Date
    }
)

const orderModel = mongoose.model('Order',orderSchema);

module.exports = orderModel;

*/



