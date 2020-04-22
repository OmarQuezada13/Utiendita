const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let ArticuloSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "Favor ingresar el nombre del producto"],
    default: false
  },
  descripcion: {
    type: String
  },
  costo: {
    type: Number,
    required: [true, "Favor ingresar el costo del producto"]
  },
  inventario: {
    type: Number,
    required: [true, "Favor ingresar el inventario del producto"],
    required: false
  },
  img: {
    type: String,
    default:'noImage.png'
  },
  estatus: {
    type: Boolean,
    default: true
  }
});

ArticuloSchema.plugin(uniquevalidator, {
  message: "{PATH} Debe ser unico y diferente"
});

module.exports = mongoose.model("Articulo", ArticuloSchema);
