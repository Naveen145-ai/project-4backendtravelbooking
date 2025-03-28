const express = require('express');
const ProductModel = require('../models/productModel');
const router = express.Router();

// ✅ Add a new product
router.post('/products', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ✅ Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Update a product
router.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;




/*  const express = require('express');
const multer = require('multer');
const path = require('path');
const ProductModel = require('../models/productModel');

const router = express.Router();

// Multer setup for storing uploaded images
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// ✅ Upload Image Route
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

// ✅ CRUD Routes for Products
router.post('/products', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
 */ 
