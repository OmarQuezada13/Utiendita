const express = require("express");
const _ = require("underscore");
const Compra = require("../../models/compra");
const app = express();

app.get("/obtener/:id", (req, res) => {
  let id = req.params.id;
  Compra.find({ usuario: id })
    .populate("articulo")
    .exec((err, comDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      return res.status(200).json({
        ok: true,
        count: comDB.length,
        msg: `Se encontraron ${comDB.length} articulos Comrados por ti`,
        cont: comDB
      });
    });
});

app.post("/registrar", (req, res) => {
  let body = req.body;
  let compra = new Compra({
    usuario: body.usuario,
    articulo: body.articulo,
    cantidad: body.cantidad,
    fecha: body.fecha
  });
  compra.save((err, comDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    return res.status(200).json({
      ok: true,
      msg: `Se registro correctamente tu compra`,
      cont: comDB
    });
  });
});


module.exports = app;
