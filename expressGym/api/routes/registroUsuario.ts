import express from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';

mongoose.connect("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")
.then(res=>{
    console.log("Conectado")
}).catch(err=>{
    console.log("Algo salió mal");
    console.log(err);
})
var usuariosSchema = new mongoose.Schema({
    codigo:Number,
    rut:String,
    dv:String,
    nombre:String,
    apellido:String,
    pregunta:String,
    respuesta:String,
    imagen:String,
    rol:String
})
var usuarioModelo = mongoose.model("Usuarios",usuariosSchema)

router.post("/registroUsuario",(req:any,res:any)=>{
     

})

export default module.exports=router