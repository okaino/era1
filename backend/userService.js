const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cors = require('cors')
const cookieParser = require('cookie-parser')

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/api', authRoutes);

const PORT_USER = process.env.PORT_USER || 3001;
app.listen(PORT_USER, () => {
  console.log(`User Server running on port ${PORT_USER}`);
});
