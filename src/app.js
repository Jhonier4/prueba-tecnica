const express = require("express");
const cors = require("cors");

const { db, initializeDatabase } = require("./models/database");

const app = express();
app.use(cors());
app.use(express.json());

initializeDatabase();

// ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionandooooooo");
});

// iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});