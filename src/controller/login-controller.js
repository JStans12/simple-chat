const UsersService = require('../service/users-service.js');

class LoginController {
  static async create(req, res) {
    const user = await UsersService.findOrCreateUser(req.body.sender);
    /*
    We are using a user id where we would typically use an auth token.
    This is used to determine the sender of the message.
    It could also be used to verify the sender if it was a real token.
    */
    const id = user.id;
    res.cookie('token', id);
    return res.send({ id });
  }
}

module.exports = LoginController;
