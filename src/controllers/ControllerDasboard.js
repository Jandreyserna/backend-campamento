const ModalDasboard = require('../models/ModelDasboard');
require('dotenv').config();
const DasboardModel = new ModalDasboard();

class ControllerDasboard {
    constructor() {}

    async get_data_campers() {
        try {
            const data = await DasboardModel.get_data_campers();
            return { success: true, data: data };
        } catch (error) {
            return { success: false, message: 'Error al obtener los datos del dashboard', error: error.message };
        }
    }
}

module.exports = ControllerDasboard;