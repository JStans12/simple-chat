const express = require('express');
const router = express.Router();
const LoginController = require('../controller/login-controller.js');

router.route('/').post(LoginController.create);

module.exports = router;
