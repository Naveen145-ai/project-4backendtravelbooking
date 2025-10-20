const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    child: { type: Number, required: true },
    teen: { type: Number, required: true },
    adults: { type: Number, required: true },
    senior: { type: Number, required: true },
    ratings: { type: String, required: true },
    description: { type: String, required: true },
    Enter: { type: String, required: true },
    Return: { type: String, required: true },
    stock: { type: Number, required: true },
    images: [{ 
       "image": {type: String, required: true },
    }],
    Date: { type: String, required: true },  // ✅ Added missing Date field
    Hotels: { type: String, required: true },
    Places: { type: String, required: true },
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
