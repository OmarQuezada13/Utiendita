/* jshint esversion: 8 */
//agrupa todos los archivos-rutas
const express = require("express");
const app = express();

app.use("/articulo", require("./articulo/articulo"));
app.use("/usuario", require("./usuario/registro"));
app.use("/carrito", require("./carrito/carrito"));
app.use("/subir", require("./upload/upload"));
app.use("/imagen", require("./imagen/imagen"));
app.use("/compra",require('./compra/compra'));
app.use(require("./usuario/inicio"));
module.exports = app;
