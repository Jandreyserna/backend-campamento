const express = require('express');
const router = express.Router();

const registerRoutes = require('./registerRoutes/register');
const getTypeIdentity = require('./registerRoutes/formGetTypeIdentity');
const loginRoutes = require('./loginRoutes/login');
const dasboardRoutes = require('./dasboardRoutes/dasboard'); 
const emailRoutes = require('./emailsRoutes/emailRoute');
const userRoutes = require('./userRoutes/userRoute');
// Importa otros módulos de rutas aquí
// const userRoutes = require('./userRoutes');
// const productRoutes = require('./productRoutes');

router.use('/register', registerRoutes);
router.use('/get-type-identity', getTypeIdentity);
router.use('/login', loginRoutes);
router.use('/dasboard', dasboardRoutes);
router.use('/correo', emailRoutes);
router.use('/pagos', userRoutes);
// Usa otros módulos de rutas aquí
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);

module.exports = router;