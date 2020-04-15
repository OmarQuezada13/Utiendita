/* jshint esversion: 8 */
//agrupa todos los archivos-rutas
const express = require("express");
const app = express();

app.use("/articulo", require("./articulo/articulo"));
app.use("/usuario", require("./usuario/registro"));
app.use("/carrito", require("./carrito/carrito"));
app.use(require("./usuario/inicio"));
module.exports = app;
