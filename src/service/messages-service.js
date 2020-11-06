const Message = require('../model/message.js');

class MessagesService {
  static async getAllForConversation(conversationId) {
    return await Message.find({ conversation: conversationId });
  }

  static async find(limit, recent, sender, recipient) {
    const params = {}
    if (recent) {
      var date = new Date();
      date.setDate(date.getDate() - 30);
      params['createdAt'] = { '$gte': date }
    }

    if (sender) {
      params['sender'] = sender
    }

    if (recipient) {
      params['recipients'] = { '$in': recipient }
    }

    const messages = await Message.find(params)
      .limit(limit)
      .populate({
         path: 'recipients',
         model: 'User',
         select: 'name -_id'
       })
      .populate('sender', 'name');

    return messages;
  }

}

module.exports = MessagesService;
