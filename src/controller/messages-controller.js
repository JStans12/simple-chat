const Message = require('../model/message.js');
const UsersService = require('../service/users-service.js');
const ConversationsService = require('../service/conversations-service.js');
const MessagesService = require('../service/messages-service.js');

class MessagesController {
  static async create(req, res) {
    const body = req.body
    const [sender, conversation] = await Promise.all([
      UsersService.find(req.params.userId),
      ConversationsService.find(req.params.conversationId)
    ]);

    Message.create({
      sender: sender,
      conversation: conversation,
      content: body.message,
      createdAt: new Date()
    }, (err, _) => {
      if (err) return res.sendStatus(500)
      res.sendStatus(200);
    });
  }

  static async showConversation(req, res) {
    const messages = await MessagesService.getAllForConversation(req.params.conversationId)
    res.send({ messages });
  }
}

module.exports = MessagesController
