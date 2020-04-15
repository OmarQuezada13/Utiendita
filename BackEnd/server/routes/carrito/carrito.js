const express = require("express");
const _ = require("underscore");
const Carrito = require("../../models/carrito");
const app = express();

app.get("/obtener/:id", (req, res) => {
  let id = req.params.id;
  Carrito.find({ usuario: id })
    .populate("articulo")
    .exec((err, carDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      return res.status(200).json({
        ok: true,
        count: carDB.length,
        msg: `Se encontraron ${carDB.length} articulos en tu carrito`,
        cont: carDB
      });
    });
});

app.post("/registrar", (req, res) => {
  let body = req.body;
  let carrito = new Carrito({
    usuario: body.usuario,
    articulo: body.articulo,
    cantidad: body.cantidad
  });
  carrito.save((err, carDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    return res.status(200).json({
      ok: true,
      msg: `Se registro correctamente el articulo ${carrito.articulo} en tu carrito`,
      cont: carDB
    });
  });
});

app.put("/actualizar/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["cantidad"]);

  Carrito.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, carDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      return res.status(200).json({
        ok: true,
        msg: `Carrito actualizado correctamente`,
        cont: carDB
      });
    }
  );
});

app.delete("/eliminar/:id", (req, res) => {
  let id = req.params.id;

  Carrito.findByIdAndDelete(id, (err, carDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    return res.status(200).json({
      ok: true,
      msg: `Articulo eliminado correctamente`,
      cont: carDB
    });
  });
});
module.exports = app;
