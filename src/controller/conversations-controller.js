const ConversationsService = require('../service/conversations-service.js');
const UsersService = require('../service/users-service.js');

class ConversationsController {
  static async start(req, res) {
    res.render('start-conversation.ejs');
  }

  static async create(req, res) {
    console.log(req.body.sender)
    const users = await Promise.all([
      UsersService.find(req.body.sender),
      UsersService.findOrCreateUser(req.body.recipient)
    ]);
    const conversation = await ConversationsService.findOrCreateConversation(users)

    return res.send({ conversationId: conversation.id })
  }

  static chat(req, res) {
    const conversationId = req.params.conversationId
    res.cookie('conversationId', conversationId)
    res.render('conversation.ejs');
  }
}

module.exports = ConversationsController
