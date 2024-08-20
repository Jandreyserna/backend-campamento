const mysql = require('mysql2/promise');

async function connectDB() {
  const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'campamento'
  });
  return connection;
}

module.exports = connectDB;