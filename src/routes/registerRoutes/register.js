const express = require('express');
const routerRegisterUser = express.Router();
const controllerRegisterUser = require('../../controllers/controllerRegisterUser');

const registerController = new controllerRegisterUser();


// Ruta para recibir el formulario
routerRegisterUser.post('/submit-form', async (req, res) => {
  const formData = req.body;
  try {
    const response = await registerController.registerUser(formData);
    if (response.success) {
      res.json({ message: 'Usuario registrado exitosamente', state: response.success });
    } else {
      res.json({ message: response.message, state: response.success })
    }
  } catch (error) {
    // Manejo de errores si es necesario
    console.error(error);
    res.status(500).json({ message: 'Error registrando usuario' });
  }
});

module.exports = routerRegisterUser;