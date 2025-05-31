const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Importar todos los routers
const productsRouter = require('./routes/productsRoutes');
const usersRouter = require('./routes/usersRoutes');
const reviewsRouter = require('./routes/reviewsRoutes');
const ordersRouter = require('./routes/ordersRoutes');
const categoriesRouter = require('./routes/categoriesRoutes'); // <- ¡Faltaba este!
const locationsRouter = require('./routes/locationsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.send('¡API de Catálogo funcionando! 🌟');
});

// Registrar todas las rutas
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/categories', categoriesRouter); // <- ¡Ahora está incluido!
app.use('/api/locations', locationsRouter);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});