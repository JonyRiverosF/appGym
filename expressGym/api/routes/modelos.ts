import mongoose, { Mongoose } from "mongoose";

var musculosSchema = new mongoose.Schema({
    nombre: String,
    foto: String
});

var MusculoModelo = mongoose.model("Musculos", musculosSchema);


var EjerciciosSchema = new mongoose.Schema({
    Titulo:String,
    video:String,
    foto:String,
    tipoMusculo:String,
    tipoMaquina:String,
})
var EjerciciosModelo = mongoose.model("Ejercicios",EjerciciosSchema)


var MaquinasSchema = new mongoose.Schema({
    nombre: String,
    foto: String
});

var MaquinasModelo = mongoose.model("maquinas", MaquinasSchema);

export default module.exports = {MusculoModelo,EjerciciosModelo,MaquinasModelo}