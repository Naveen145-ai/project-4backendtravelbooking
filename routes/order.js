const express = require('express');
const router = express.Router();
const { createOrder } = require ('../controller/orderController');


router.route('/order').post(createOrder);


module.exports = router;