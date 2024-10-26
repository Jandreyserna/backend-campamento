const connectDB = require('../config/db');

class ModelEmail {
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

  async getEmailCampers() {
    await this.connect();
    try {
      const query = 'SELECT user_id, name, last_name, id_identity, email  FROM campamento.users cu JOIN campamento.capacibility  cc ON cu.capacibility_id = cc.id WHERE cc.status_email = 0';
      const [rows] = await this.connection.execute(query);
      
      return rows;
    } catch (error) {
      console.error('Error realizando consulta de correos:', error);
      throw error;
    }finally {
      await this.disconnect();
    }
  }
}

module.exports = ModelEmail;