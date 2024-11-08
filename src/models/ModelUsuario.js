const connectDB = require('../config/db');

class ModelUsuario {
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

  async getPagoCampista(idCampista) {
    await this.connect();
    try {
      const query = 'SELECT * FROM pagos WHERE id_camper = ' + idCampista;
      const result = await this.connection.query( query );
      return result[0];
    } catch (error) {
      console.error('Error realizando consulta countIdTutors:', error);
      throw error;
    }finally {
      await this.disconnect();
    } 
  }

  async insertPaGO(formData) {
    await this.connect();
    try {
      const query = 'INSERT INTO tutors (tutor_id, identity,'+
      ' name, last_name, phone_number, created_at )'+
      ' VALUES (?, ?, ?, ?, ?, ?)';
      
      const values = [formData.tutor_id, formData.identity, formData.name, 
        formData.last_name, parseInt(formData.phone_number), formData.created_at]; 

      const [result] = await this.connection.query(query, values);

      return result.insertId;
    } catch (error) {
      console.error('Error realizando inserción de tutor:', error);
      throw error;
    }finally {
      await this.disconnect();
    }
  }
}

module.exports = ModelUsuario;