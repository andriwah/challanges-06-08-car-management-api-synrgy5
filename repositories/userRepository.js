const { User } = require('../models');

class UserRepository {
  static async register({ name, email, password, role, picture }) {
    const registered_user = await User.create({ name, email, password, role, picture });

    return registered_user;
  }

  static async getByEmail({ email }) {
    const getUsersByEmail = await User.findOne({
      where: {
        email,
      },
    });
    return getUsersByEmail;
  }

  static async deletedUserByID({ id }) {
    const deletedUser = await User.destroy({ where: { id } });

    return deletedUser;
  }
}

module.exports = UserRepository;
