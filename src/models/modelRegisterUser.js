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

  async countIdUser() {
    await this.connect();
    try {
      const result = await this.connection.query('SELECT COUNT(user_id) AS number FROM users');
      const rows = result[0];

      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0].number;
      } else {
        return 0;
      }
    } catch (error) {
      console.error('Error realizando consulta countIdUsers:', error);
      throw error;
    }finally {
      await this.disconnect();
    } 
  }

  async countIdTutors() {
    await this.connect();
    try {
      const result = await this.connection.query('SELECT COUNT(tutor_id) AS number FROM tutors');
      const rows = result[0];

      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0].number;
      } else {
        return 0;
      }
    } catch (error) {
      console.error('Error realizando consulta countIdTutors:', error);
      throw error;
    }finally {
      await this.disconnect();
    } 
  }

  async countIdIdentity(identity) {
    await this.connect();
    try {
      const result = await this.connection.query('SELECT COUNT(id_identity) AS number FROM users WHERE id_identity = ' + identity);
      const rows = result[0];

      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0].number;
      } else {
        return 0;
      }
    } catch (error) {
      console.error('Error realizando consulta countIdIdentity:', error);
      throw error;
    }finally {
      await this.disconnect();
    } 
  }

  async validateTutorIdentity(identity) {
    await this.connect();
    try {
      const query = 'SELECT * FROM tutors WHERE identity = ' + identity;
      const result = await this.connection.query( query );
      return result[0];
    } catch (error) {
      console.error('Error realizando consulta countIdTutors:', error);
      throw error;
    }finally {
      await this.disconnect();
    } 
  }

  async insertUser(formData) {
    await this.connect();
    try {
      const query = 'INSERT INTO users (user_id, id_type, id_identity,'+
      ' name, last_name, email, genero, city, congregation,'+
      ' is_congregating, phone_number, birth_date, is_younger,'+
      ' id_tutor, created_at, password, capacibility_id)'+
      ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      
      const values = [
        formData.user_id, formData.id_type, formData.id_identity, 
        formData.name, formData.last_name, formData.email, 
        formData.genero, formData.city, formData.congregation, 
        formData.is_congregating, formData.phone_number,
        formData.birth_date, formData.is_younger,
        formData.id_tutor, formData.created_at, formData.password, formData.user_id
      ];
      
      await this.connection.query(query, values);

      const query2 = 'INSERT INTO capacibility (id) VALUES (?)';
      
      const values2 = [
        formData.user_id
      ];
      
      await this.connection.query(query2, values2);
      return true;
    } catch (error) {
      console.error('Error realizando inserción de usuario:', error);
      throw error;
    }finally {
      await this.disconnect();
    }
  }

  async insertTutor(formData) {
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

  async getIdentityType() {
    await this.connect();
    try {
      const result = await this.connection.query('SELECT * FROM `identity_type` WHERE 1');
      
      // Verifica la estructura del resultado
      if (Array.isArray(result) && result[0] && result[0].length > 0) {
        return result[0];
      }else {
        console.warn('No se encontraron tipos de identidad.');
        return undefined;
      }
    } catch (error) {
      console.error('Error realizando consulta obtener tipos de identidad:', error);
      throw error;
    }finally {
      await this.disconnect()
    }
  }

  async updateMailStatus(id) {
    await this.connect();
    try {
        const query = 'UPDATE campamento.capacibility SET status_email = 1 WHERE id = ? ';
        const values = [id];
        await this.connection.query(query, values);
        return true;
      } catch (error) {
        console.error('Error realizando actualización de estado de correo:', error);
        throw error;
      }finally {
        await this.disconnect
    }
  }
}

module.exports = ModelRegister;