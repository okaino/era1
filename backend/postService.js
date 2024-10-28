const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authPost');
const cors = require('cors')
const cookieParser = require('cookie-parser')

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/post', authRoutes);

const PORT_POST = process.env.PORT_POST || 4001;
app.listen(PORT_POST, () => {
  console.log(`Post Server running on port ${PORT_POST}`);
});
