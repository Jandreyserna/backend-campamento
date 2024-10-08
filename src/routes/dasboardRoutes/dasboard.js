const express = require('express');
const routerDasboard = express.Router();
const ControllerDasboard = require('../../controllers/ControllerDasboard');

const DasboardController = new ControllerDasboard();


// Ruta para recibir el formulario
routerDasboard.get('/load-campistas', async (req, res) => {
  try {
    const response = await DasboardController.get_data_campers();
    if (response.success) {
      res.json( response.data );
    } else {
      res.json({ message: 'Error en la autenticación', state: response.success });
    }
  } catch (error) {
    // Manejo de errores si es necesario
    console.error(error);
    res.status(500).json({ message: 'Error en la autenticación' });
  }
});

module.exports = routerDasboard;