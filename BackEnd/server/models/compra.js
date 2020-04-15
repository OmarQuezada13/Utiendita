const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");

const Articulo = require("./articulo");
const Usuario = require("./usuario");

let Schema = mongoose.Schema;

let CompraSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectID,
    ref: "Usuario",
    required: true
  },
  articulo: {
    type: Schema.Types.ObjectID,
    ref: "Articulo",
    required: true
  },
  cantidad: {
    type: Number,
    default: 1
  },
  fecha: {
    type: Date,
    default: Date.now()
  }
});

CompraSchema.plugin(uniquevalidator, {
  message: "{PATH} Debe ser unico y diferente"
});

module.exports = mongoose.model("Compra", CompraSchema);
