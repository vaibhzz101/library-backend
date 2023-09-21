
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

async function registerUser(req, res) {
  try {
    const { name, email, password, isAdmin } = req.body;
 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await user.save();

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, config.secretKey);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Registration failed' });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, config.secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
