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

    async updateMailStatus(id) {
        await this.connect();
        try {
            const query = 'UPDATE campamento.capacibility SET status_email = 1 WHERE id = ?';
            const value = [id];
            await this.connection.query(query, value);
            return true;
        } catch (error) {
            console.error('Error realizando actualizacion de correos:', error);
            throw error;
        }finally {
            await this.disconnect();
        }
    }

    async getCorreoCampista(id) {
        await this.connect();
        try {
            const query = ` SELECT 
                                cc.correo_dos AS status_correo, 
                                CONCAT(cu.name, ' ', cu.last_name) AS nombre, 
                                cu.email AS correo
                            FROM 
                                campamento.correo cc 
                            INNER JOIN 
                                campamento.users cu 
                            ON 
                                cu.user_id = cc.camper_id 
                            WHERE 
                                cc.camper_id = ? `;

            const value = [id];
            const [rows] = await this.connection.execute(query, value);
            return rows;
        } catch (error) {
            console.error('Error realizando consulta de correos:', error);
            throw error;
        }finally {
            await this.disconnect();
        }
    }

    async updateCorreoCampista(id) {
        await this.connect();
        try {
            const query = 'UPDATE campamento.correo SET correo_dos = 1 WHERE id = ?';
            const value = [id];
            await this.connection.query(query, value);
            return true;
        } catch (error) {
            console.error('Error realizando actualizacion de correos:', error);
            throw error;
        }finally {
            await this.disconnect();
        }
    }
}

module.exports = ModelEmail;