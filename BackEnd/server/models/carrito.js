const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");

const Articulo = require("./articulo");
const Usuario = require("./usuario");

let Schema = mongoose.Schema;

let CarritoSchema = new Schema({
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
  }
});

CarritoSchema.plugin(uniquevalidator, {
  message: "{PATH} Debe ser unico y diferente"
});

module.exports = mongoose.model("Carrito", CarritoSchema);
