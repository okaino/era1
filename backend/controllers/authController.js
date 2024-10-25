const bcrypt = require('bcrypt');
const { generateToken, generateRefreshToken } = require('../utils/token');
const { addUser, findUserByEmail } = require('../models/user');

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  
  const existingUser = findUserByEmail(email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  addUser({ email, password: hashedPassword });

  res.status(201).json({ message: 'User registered' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  const user = findUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ accessToken, refreshToken });
};

const logoutUser = (req, res) => {
  // Logic for logout (you can use tokens revocation logic here)
  res.json({ message: 'Logged out successfully' });
};

const refreshToken = (req, res) => {
  const { token } = req.body;
  // Validate and refresh the token
  const newAccessToken = generateToken({ email: req.user.email });
  res.json({ accessToken: newAccessToken });
};

module.exports = { registerUser, loginUser, logoutUser, refreshToken };
