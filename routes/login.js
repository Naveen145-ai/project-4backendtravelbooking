const express = require('express');
const { createLogin } = require('../controller/loginController');

const router = express.Router();

router.route('/login').post(createLogin);


module.exports = router;
