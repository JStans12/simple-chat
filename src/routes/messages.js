const express = require('express');
const router = express.Router();
const MessagesController = require('../controller/messages-controller.js');

router.route('/').get(MessagesController.index);

module.exports = router;
