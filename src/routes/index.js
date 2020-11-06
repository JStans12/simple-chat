module.exports = function(app) {
  app.get('/', (req, res) => {
      res.render('login.ejs');
  });

  const login = require('./login.js');
  app.use('/login', login);

  const conversations = require('./conversations.js');
  app.use('/conversations', conversations);

  const messages = require('./messages.js');
  app.use('/messages', messages);
};
