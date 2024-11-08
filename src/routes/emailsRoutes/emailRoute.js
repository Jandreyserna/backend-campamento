const express = require('express');
const emailRouter = express.Router();
const ControllerCorreo = require('../../controllers/ControllerCorreo');

const CorreoController = new ControllerCorreo();


// Ruta para recibir el formulario
emailRouter.get('/correos-campistas', async (req, res) => {
  try {
    const response = await CorreoController.getDataEmails();
    if (response.success) {
      res.json( response.data );
    } else {
      res.json({ message: 'Error en la consulta', state: response.success });
    }
  } catch (error) {
    // Manejo de errores si es necesario
    console.error(error);
    res.status(500).json({ message: 'Error en la ruta de correos' });
  }
});

emailRouter.get('/correo-cristiano/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await CorreoController.enviarCorreoCampista(id);
    if (response.success) {
      res.json( response.data );
    } else {
      res.json({ message: 'Error en la consulta', state: response.success });
    }
  } catch (error) {
    // Manejo de errores si es necesario
    console.error(error);
    res.status(500).json({ message: 'Error al enviar correo campista' });
  }
});

module.exports = emailRouter;