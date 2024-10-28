const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken, generateRefreshToken, destroyToken } = require('../utils/token');

const db = require('../db');

const registerUser = async (req, res) => {
  try {
    const { email, password, user_name, user_surname } = req.body;
  
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) return res.status(400).json({ message: 'User already exists' });
  
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password, user_name, user_surname) VALUES (?, ?, ?, ?)', [email, hashedPassword, user_name, user_surname]);
  
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).send({ error: "Error registering user" });
  }
    
  };
  

  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
    
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
     
    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    const user_id = user.id

    res.json({ accessToken, refreshToken, user_id });
    } catch (error) {
      res.status(500).send({ error:"Error logging user" });
    }
    
  };
const logoutUser = async (req, res) => {
  // Logic for logout (you can use tokens revocation logic here)
  const { email } = req.body;
    
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
  
  const user = rows[0];
  const re = destroyToken(user)
  console.log(re)
  res.json({ message: 'Logged out successfully' });
};

const refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: 'Refresh token required' });
    }
  
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
  
      // Generate a new access token with the same user information
      const newAccessToken = generateToken({ email: user.email });
      res.json({ accessToken: newAccessToken });
    });
};

module.exports = { registerUser, loginUser, logoutUser, refreshToken };
