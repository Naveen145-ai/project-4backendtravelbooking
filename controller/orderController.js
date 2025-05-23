
const productModel = require('../models/productModel'); 
const orderModel = require('../models/orderModel');

exports.createOrder = async (req, res, next) => {
    try {
        const cartItems = req.body;

        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid cart items" });
        }
        console.log("Received cartItems:", cartItems);
        
        let amount = 0;
        const ageCategoryMap = {
            "adult": "adults",
            "child": "child",
            "teen": "teen",
            "senior": "senior"
        };
        
        console.log("1");
  
        const productIds = cartItems.map(item => item.product._id);
        const products = await productModel.find({ _id: { $in: productIds } });
        
        console.log("2");
     
        const productMap = new Map(products.map(product => [product._id.toString(), product]));
        console.log("3");
        
        for (const item of cartItems) {
            console.log(item)
            const product = productMap.get(item.product._id.toString());
           
            console.log("in");
          
            if (!product) {
                console.error(`Product not found for ID: ${item.product._id}`);
                return res.status(404).json({ success: false, message: "Product not found" });
            }
            
            const normalizedAgeCategory = ageCategoryMap[item.category];
            console.log(normalizedAgeCategory);
            let price = product[normalizedAgeCategory];  
            console.log(price);
            if (price === undefined) {
                return res.status(700).json({ success: false, message: `Invalid age category: ${item.ageCategory}` });
            }
            
            amount += price * item.qty;
        }
        console.log("lasts");
        
        
        amount = parseFloat(amount.toFixed(2));
        
      
        const order = await orderModel.create({ 
            cartItems: cartItems.map(item => ({
                product: item.product._id,
                qty: item.qty,
                category: item.category 
            })), 
            amount, 
            status: 'pending' 
        });
        console.log(order);
        
     
        const bulkUpdateOps = cartItems.map(item => ({
            updateOne: {
                filter: { _id: item.product._id },
                update: { $inc: { stock: -item.qty } }
            }
        }));
        

        await productModel.bulkWrite(bulkUpdateOps);

        res.json({ success: true, order });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



