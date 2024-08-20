const express = require('express');
const router = express.Router();

const registerRoutes = require('./registerRoutes/register');
const getTypeIdentity = require('./registerRoutes/formGetTypeIdentity');
// Importa otros módulos de rutas aquí
// const userRoutes = require('./userRoutes');
// const productRoutes = require('./productRoutes');

router.use('/register', registerRoutes);
router.use('/get-type-identity', getTypeIdentity);
// Usa otros módulos de rutas aquí
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);

module.exports = router;