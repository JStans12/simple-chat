class MessagesPresenter {
  static serialize(messages) {
    const result = []
    messages.forEach(message => {
      result.push({
        sender: message.sender.name,
        recipients: message.recipients.map(recipient => recipient.name),
        content: message.content
      })
    });

    return result;
  }
}

module.exports = MessagesPresenter;
