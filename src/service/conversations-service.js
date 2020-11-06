const Conversation = require('../model/conversation.js');

class ConversationsService {
  static async find(conversationId) {
    const conversation = await Conversation.findById(conversationId)
    return conversation;
  }

  static async findOrCreateConversation(users) {
    const conversation = await Conversation.findOne(
      { "$and": [
      { "users": users[0].id },
      { "users": users[1].id },
      { "users": { "$size": 2 } }
    ]});
    return conversation != null ? conversation : Conversation.create({ users: users });
  }
}

module.exports = ConversationsService;
