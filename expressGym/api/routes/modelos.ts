import mongoose, { Mongoose } from "mongoose";

var usuariosSchema = new mongoose.Schema({
    codigo:String,
    rut:String,
    nombre:String,
    apellido:String,
    telefono:Number,
    correo:String,
    imagen:String,
    fichaMedica:String,
    observacionMedica:String,
    estado:String,
    codigoSeguridad:String,
    rol:String
})
var usuarioModelo = mongoose.model("Usuarios",usuariosSchema)

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

var tipoDietasSchema = new mongoose.Schema({
    nombre: String,
    foto: String
});

var tipoDietasModelo = mongoose.model("tipoDietas", tipoDietasSchema);

var DietasSchema = new mongoose.Schema({
    nombre: String,
    tipoD:String,
    foto: String,
    
});

var DietasModelo = mongoose.model("dietas", DietasSchema);

var NoticiaSchema = new mongoose.Schema({
    tituloN:String,
    bajadaN:String,
    fechaC:String,
    descN:String,
    video:String,
    foto:String,
    
})

var NoticiaModelo = mongoose.model("noticia",NoticiaSchema)

var horariosElegidos = new mongoose.Schema({
    rutUsuario:String,
    horarios:Array,
    fechaInscripcion:Date,
    vigencia:Boolean

})
var horariosElegidosModelo = mongoose.model("HorariosElegidos",horariosElegidos)


var horariosSchema = new mongoose.Schema({
    fecha:Date,
    horas:Array,
    vigencia:Boolean
})

var horariosModelo = mongoose.model("horarios",horariosSchema)

var guardadosSchema = new mongoose.Schema({
    rutUsuario:String,
    archivoGuardado:String,
    titulo:String,
    idArchivo:String,
    tipoArchivo:String
})
var guardadosModelo = mongoose.model("guardados",guardadosSchema)

export default module.exports = {MusculoModelo,EjerciciosModelo,MaquinasModelo,tipoDietasModelo,DietasModelo,
    NoticiaModelo,usuarioModelo,horariosElegidosModelo,horariosModelo,guardadosModelo
}