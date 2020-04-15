const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "Favor ingresar el nombre del producto"],
    default: false
  },
  apellidos: {
    type: String,
    required: [true, "Favor ingresar el/los apellido(s)"],
    default: false
  },
  matricula: {
    type: Number,
    required: [true, "Favor ingresar su matricula de la UTA"]
  },
  contraseña: {
    type: String,
    required: [true, "Favor ingresar su contaseña"]
  },
  img: {
    type: String
  },
  rol: {
    type: String,
    default: "cliente"
  },
  estatus: {
    type: Boolean,
    default: true
  }
});

UsuarioSchema.plugin(uniquevalidator, {
  message: "{PATH} Debe ser unico y diferente"
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
