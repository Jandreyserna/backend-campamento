const express = require('express');
const routerRegisterUser = express.Router();
const controllerLoginUser = require('../../controllers/ControllerLoginUser');

const loginController = new controllerLoginUser();


// Ruta para recibir el formulario
routerRegisterUser.post('/auth-login', async (req, res) => {
  const formData = req.body;
  console.log('Datos que van', formData);
  try {
    const response = await loginController.login_user(formData);
    console.log('respuesta', response)
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

module.exports = routerRegisterUser;