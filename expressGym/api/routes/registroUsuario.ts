import express, { Request, Response } from "express";
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

router.post("/registroUsuario",upload.any(),(req:Request,res:Response)=>{
    usuarioModelo.create({
        clave:4321,
        rut:req.body.rut,
        dv:req.body.digitoVerificador,
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        pregunta:req.body.pregunta,
        respuesta:req.body.respuesta,
        imagen:"",
        rol:1
    }).then(response=>{
        res.status(201).json({
            mensaje:"Salió todo bien",
            servidor:req.body
        })
    }).catch((error:any)=>{
        res.status(201).json({
            mensaje:"Algo salió mal",
            respuesta:error
        })
    })

   // console.log(req)
})

export default module.exports=router