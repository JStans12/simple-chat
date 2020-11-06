const Message = require('../model/message.js');

class MessagesService {
  static async getAllForConversation(conversationId) {
    return await Message.find({ conversation: conversationId });
  }
}

module.exports = MessagesService;
