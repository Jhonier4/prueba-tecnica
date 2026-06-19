const express = require("express");
const cors = require("cors");

const { db, initializeDatabase } = require("./models/database");

const app = express();
app.use(cors());
app.use(express.json());

initializeDatabase();

const consumersRoutes = require('./routes/consumers.routes');
app.use('/consumers', consumersRoutes);

const productsRoutes = require('./routes/products.routes');
app.use('/products', productsRoutes);

const ordersRoutes = require('./routes/orders.routes');
app.use('/orders', ordersRoutes);

// iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});