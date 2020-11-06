const User = require('../model/user.js');

class UsersService {
  static async find(userId) {
    const user = await User.findById(userId)
    return user;
  }

  static async findByName(name) {
    const user = await User.findOne({ name: name });
    return user;
  }

  static async findOrCreateUser(name) {
    const user = await User.findOne({ name: name });
    return user != null ? user : User.create({ name: name });
  }
}

module.exports = UsersService
