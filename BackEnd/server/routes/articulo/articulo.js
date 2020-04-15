const express = require("express");
const _ = require("underscore");
const Articulo = require("../../models/articulo");
const app = express();

app.get("/obtener", (req, res) => {
  Articulo.find().exec((err, artDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    return res.status(200).json({
      ok: true,
      count: artDB.length,
      msg: `Se encontraron ${artDB.length} articulos`,
      cont: artDB
    });
  });
});

app.post("/registrar", (req, res) => {
  let body = req.body;
  let articulo = new Articulo({
    nombre: body.nombre,
    descripcion: body.descripcion,
    costo: body.costo,
    inventario: body.inventario,
    img: body.img
  });
  articulo.save((err, artDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    return res.status(200).json({
      ok: true,
      msg: `Se registro correctamente el articulo ${articulo.nombre}`,
      cont: artDB
    });
  });
});

app.put("/actualizar/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, [
    "nombre",
    "descripcion",
    "costo",
    "inventario",
    "img"
  ]);

  Articulo.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, artDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      return res.status(200).json({
        ok: true,
        msg: `Articulo actualizado correctamente`,
        cont: artDB
      });
    }
  );
});

app.delete("/eliminar/:id", (req, res) => {
  let id = req.params.id;

  Articulo.findByIdAndUpdate(
    id,
    { estatus: false },
    { new: true, runValidators: true, context: "query" },
    (err, artDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      return res.status(200).json({
        ok: true,
        msg: `Articulo actualizado correctamente`,
        cont: artDB
      });
    }
  );
});
module.exports = app;
