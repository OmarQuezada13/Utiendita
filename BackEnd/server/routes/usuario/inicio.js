const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../../models/usuario");
const app = express();

app.post("/login", (req, res) => {
  let body = req.body;
  Usuario.findOne({ matricula: body.matricula }, (err, usrDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    if (!usrDB) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "El usuario y/o contraseña son incorrectos"
        }
      });
    }
    if (!bcrypt.compareSync(body.contraseña, usrDB.contraseña)) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "El usuario y/o contraseña* son incorrectos"
        }
      });
    }
    let token = jwt.sign(
      {
        usuario: usrDB
      },
      process.env.SEED,
      { expiresIn: "3h" }
    );
    return res.status(200).json({
      ok: true,
      usrDB,
      token: token
    });
  });
});

module.exports = app;
