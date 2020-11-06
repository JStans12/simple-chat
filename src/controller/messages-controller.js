const Message = require('../model/message.js');
const UsersService = require('../service/users-service.js');
const ConversationsService = require('../service/conversations-service.js');
const MessagesService = require('../service/messages-service.js');
const MessagesPresenter = require('../presenter/messages-presenter.js');

class MessagesController {
  static async create(req, res) {
    const body = req.body;
    const [sender, conversation] = await Promise.all([
      UsersService.find(req.params.userId),
      ConversationsService.findById(req.params.conversationId)
    ]);

    const recipients = conversation.users.filter(user => user != sender.id);

    Message.create({
      sender: sender,
      conversation: conversation,
      recipients: recipients,
      content: body.message,
      createdAt: new Date()
    }, (err, _) => {
      if (err) return res.sendStatus(500);
      res.sendStatus(200);
    });
  }

  static async showConversation(req, res) {
    const messages = await MessagesService.getAllForConversation(req.params.conversationId);
    res.send({ messages });
  }

  static async index(req, res) {
    const limit = parseInt(req.query.limit);
    const recent = req.query.recent === "true";
    let sender;
    if (req.query.sender) {
      sender = await UsersService.findByName(req.query.sender);
    }
    let recipient;
    if (req.query.recipient) {
      recipient = await UsersService.findByName(req.query.recipient);
    }
    const messages = await MessagesService.find(limit, recent, sender, recipient);
    const data = MessagesPresenter.serialize(messages);
    res.send({ data });
  }
}

module.exports = MessagesController
