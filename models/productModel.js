const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    child: { type: String, required: true },
    teen: { type: String, required: true },
    adults: { type: String, required: true },
    senior: { type: String, required: true },
    ratings: { type: String, required: true },
    description: { type: String, required: true },
    Enter: { type: String, required: true },
    Return: { type: String, required: true },
    stock: { type: String, required: true },
    images: [{ 
       "image": {type: String, required: true },
    }],
    Date: { type: String, required: true },  // ✅ Added missing Date field
    Hotels: { type: String, required: true },
    Places: { type: String, required: true },
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
