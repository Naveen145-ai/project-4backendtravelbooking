const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ratings: { type: Number, required: true },
    description: { type: String, required: true },
    Enter: { type: String, required: true },
    Return: { type: String, required: true },
    stock: { type: Number, required: true },
    images: [
        {
            image: { type: String, required: true }
        }
    ],
    Date: { type: String, required: true },
    Hotels: { type: String, required: true },
    Places: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
