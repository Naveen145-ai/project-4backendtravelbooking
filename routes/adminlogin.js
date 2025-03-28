const express = require('express');
const { adminLogin } = require('../controller/adminloginController');

const router = express.Router();

router.route('/adminlogin').post(adminLogin);


module.exports = router;
