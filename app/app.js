const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// conectar base de datos
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Base de datos conectada");
  }
});

// ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionandooooooo");
});

// iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});