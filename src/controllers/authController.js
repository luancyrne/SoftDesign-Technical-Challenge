const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const User = require('../models/user');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 600,
  });
}

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;

    return res.send({ msg: 'Logged', token: generateToken({ id: user.id, admin: user.admin }) });
  },
  register: async (req, res) => {
    const { email } = req.body;

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'User already exists' });
      }

      const user = await User.create(req.body);

      user.password = undefined;

      return res.send({ msg: 'Registered', token: generateToken({ id: user.id, admin: user.admin }) });
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  },
};
