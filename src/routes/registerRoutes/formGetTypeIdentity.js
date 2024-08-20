const express = require('express');
const routerGetTypeIdentity = express.Router();
const controllerRegisterUser = require('../../controllers/controllerRegisterUser');

const registerController = new controllerRegisterUser();


// Ruta para recibir el formulario
routerGetTypeIdentity.get('/identity-type', async (req, res) => {
  try {
    const response = await registerController.identityType();
    res.json({ message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo tipo de identificación' });
  }
});

module.exports = routerGetTypeIdentity;