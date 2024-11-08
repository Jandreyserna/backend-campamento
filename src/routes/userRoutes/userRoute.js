const express = require('express');
const userRouter = express.Router();
const ControllerUsuario = require('../../controllers/ControllerUsuario');

const UsuarioController = new ControllerUsuario();


// Ruta para recibir el formulario
userRouter.get('/consultar-pagos/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const response = await UsuarioController.getPagos(id);
    if (response.success) {
      res.json( response.data );
    } else {
      res.json({ message: 'Error en la consulta', state: response.success });
    }
  } catch (error) {
    // Manejo de errores si es necesario
    console.error(error);
    res.status(500).json({ message: 'Error en la ruta de Pagos' });
  }
});

module.exports = userRouter;