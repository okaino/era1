const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: process.env.DB_PORT,
  user: process.env.DB_USER_NAME,    
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
});

connection.connect(err => {
    if (err) {
      return console.error('Error connecting to the database:', err);
    }
    console.log('Connected to the MySQL server.');
    
  });

module.exports = connection.promise();
