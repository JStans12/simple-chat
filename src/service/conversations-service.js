const Conversation = require('../model/conversation.js');

class ConversationsService {
  static async findById(conversationId) {
    const conversation = await Conversation.findById(conversationId)
    return conversation;
  }

  static async find(users) {
    /*
    Find a conversation where the users array matches our users.
    The order is not taken into account.
    This would need to be refactored for group chat.
    */
    const conversation = await Conversation.findOne(
      { "$and": [
      { "users": users[0].id },
      { "users": users[1].id },
      { "users": { "$size": 2 } }
    ]});
    return conversation;
  }

  static async findOrCreateConversation(users) {
    const conversation = await ConversationsService.find(users);
    return conversation != null ? conversation : Conversation.create({ users: users });
  }
}

module.exports = ConversationsService;
