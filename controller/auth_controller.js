const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupValidation, loginValidation } = require('../utils/validators');
const transporter = require('../config/mailer');
const User = require('../model/user');

exports.signup = async (req, res) => {
  const { error } = signupValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const userExists = await User.findOne({ where: { email: req.body.email } });
  if (userExists) return res.status(400).json({ error: 'Email already exists' });

  const mobileExists = await User.findOne({ where: { mobile: req.body.mobile } });
  if (mobileExists) return res.status(400).json({ error: 'Mobile number already exists' });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    mobile: req.body.mobile,
    isVerified: false
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const url = `http://localhost:3000/api/auth/verify/${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Verify Email',
      html: `<a href="${url}">Click here to verify your email</a>`
    });
    res.json({ message: 'Signup successful, please check your email to verify your account' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: 'Could not send verification email' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.isVerified) return res.status(400).json({ error: 'User already verified' });

    user.isVerified = true;
    await user.save();
    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

exports.login = async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user || !user.isVerified) return res.status(400).json({ error: 'Invalid credentials or unverified email' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
