const express = require('express');
const router = express.Router({ mergeParams : true });
const ConversationsController = require('../controller/conversations-controller.js');
const MessagesController = require('../controller/messages-controller.js');

router.route('/').get(ConversationsController.start);
router.route('/').post(ConversationsController.create);
router.route('/:conversationId/chat').get(ConversationsController.chat);

// These routes may fit better in a conversations/messages-controller.
router.route('/:conversationId/messages').get(MessagesController.showConversation);
router.route('/:conversationId/users/:userId/messages').post(MessagesController.create);

module.exports = router;
