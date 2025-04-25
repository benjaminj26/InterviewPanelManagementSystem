
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString('hex');

  const user = new User({
    email,
    password: hashed,
  });

  await user.save();

  res.status(201).json({ message: 'Registered. Verify your email.' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
  
    const token = jwt.sign({ id: user._id ,email:user.email}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  };
  
