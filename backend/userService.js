const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api', authRoutes);

const PORT_USER = process.env.PORT_USER || 3001;
app.listen(PORT_USER, () => {
  console.log(`User Server running on port ${PORT_USER}`);
});
