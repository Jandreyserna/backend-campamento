const connectDB = require('../config/db');

class ModelRegister {
  constructor() {
        this.connection = null;
  }

  async connect() {
      if (!this.connection) {
        try {
          this.connection = await connectDB();
        } catch (error) {
          console.error('Error connecting to the database:', error);
          throw error;
        }
    }
  }

  async disconnect() {
    if (this.connection) {
      try {
        await this.connection.end();
      } catch (error) {
        console.error('Error disconnecting from the database:', error);
        throw error;
      } finally {
        this.connection = null;
      }
    }
  }

  async query_user_loging(data) {
    await this.connect();
    try {
      const query = 'SELECT * FROM users WHERE id_identity = ? AND password = ?';
      const values = [data.username, data.password];
      const [rows] = await this.connection.execute(query, values);
      return rows;
    } catch (error) {
      console.error('Error realizando consulta de usuario:', error);
      throw error;
    }finally {
      await this.disconnect();
    }
  }
}

module.exports = ModelRegister;