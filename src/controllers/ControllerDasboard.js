const ModalDasboard = require('../models/ModelDasboard');
require('dotenv').config();
const DasboardModel = new ModalDasboard();

class ControllerDasboard {
    constructor() {}

    async get_data_campers() {
        try {
            const data = await DasboardModel.get_data_campers();
            const filteredData = data.map(camper => {
                const { password, ...camperWithoutPassword } = camper;
                return {
                    id_usuario: camperWithoutPassword.user_id,
                    tipo_identificacion: this.translateIdType(camperWithoutPassword.id_type),
                    identificacion: camperWithoutPassword.id_identity,
                    nombre: camperWithoutPassword.name,
                    apellido: camperWithoutPassword.last_name,
                    correo: camperWithoutPassword.email,
                    genero: camperWithoutPassword.genero === 'male' ? 'masculino' : 'femenino',
                    ciudad: camperWithoutPassword.city,
                    congregacion: camperWithoutPassword.congregation,
                    se_congrega: camperWithoutPassword.is_congregating === 1 ? 'Si' : 'No',
                    numero_telefono: camperWithoutPassword.phone_number,
                    fecha_nacimiento: this.formatDate(camperWithoutPassword.birth_date),
                    id_tutor: camperWithoutPassword.id_tutor,
                    fecha_creado: this.formatDate(camperWithoutPassword.created_at),
                };
            });
            console.log('filterdata:', filteredData);
            
            return { success: true, data: filteredData  };
        } catch (error) {
            return { success: false, message: 'Error al obtener los datos del dashboard', error: error.message };
        }
    }

    translateIdType(idType) {
        switch (idType) {
            case 1:
                return 'Cédula de Ciudadanía';
            case 2:
                return 'Tarjeta de Identidad';
            case 3:
                return 'Cédula de Extranjería';
            default:
                return 'Desconocido';
        }
    }

    formatDate(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }
}

module.exports = ControllerDasboard;