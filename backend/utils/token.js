const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ email: user.email, user_id: user.id, user_name: user.user_name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email, user_id: user.id, user_name: user.user_name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15m' });
};
const destroyToken = (user) => {
  try {
    return jwt.destroyed({ email: user.email, user_id: user.id, user_name: user.user_name }, process.env.ACCESS_TOKEN_SECRET) 
  } catch (error) {
    console.log(error)
  }
  
};

module.exports = { generateToken, generateRefreshToken, destroyToken };
