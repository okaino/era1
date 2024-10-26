const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authPost');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/post', authRoutes);

const PORT_POST = process.env.PORT_POST || 4001;
app.listen(PORT_POST, () => {
  console.log(`Post Server running on port ${PORT_POST}`);
});
