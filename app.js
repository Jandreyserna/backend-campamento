const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes/index');


// Configura CORS
const corsOptions = {
  origin: '*', // Permitir todas las solicitudes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usa las rutas importadas
app.use('/api', routes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
   console.log('Servidor Node.js escuchando en el puerto'+' '+port);
  });