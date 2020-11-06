const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation"
  },
  createdAt: Date,
  content: String
});

module.exports = mongoose.model("Message", MessageSchema);
