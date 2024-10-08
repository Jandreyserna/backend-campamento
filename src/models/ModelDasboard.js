const connectDB = require('../config/db');

class ModelDasboard {
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

  async get_data_campers() {
    await this.connect();
    try {
      const query = 'SELECT * FROM users';
      const [rows] = await this.connection.execute(query);
      return rows;
    } catch (error) {
      console.error('Error realizando consulta de campers:', error);
      throw error;
    }finally {
      await this.disconnect();
    }
  }
}

module.exports = ModelDasboard;