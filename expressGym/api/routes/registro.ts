import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';

mongoose.connect("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")
.then(res=>{
    console.log("Conectado registro ts")
}).catch(err=>{
    console.log("Algo salió mal");
    console.log(err);
})
var usuariosSchema = new mongoose.Schema({
    codigo:String,
    rut:String,
    dv:String,
    nombre:String,
    apellido:String,
    telefono:Number,
    correo:String,
    imagen:String,
    fichaMedica:String,
    rol:String
})
var usuarioModelo = mongoose.model("Usuarios",usuariosSchema)

router.post("/registroUsuario",upload.any(),(req:Request,res:Response)=>{
    var contador=0;var codigo = "";
    while(contador < 4){
       codigo += String(Math.floor(Math.random()*10))
       contador++;
    }
    usuarioModelo.create({
        codigo:codigo,
        rut:req.body.rut,
        dv:req.body.digitoVerificador,
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        correo:req.body.correo,
        telefono:parseInt(req.body.telefono),
        imagen:"",
        fichaMedica:"",
        rol:1
    }).then(response=>{
        res.status(201).json({
            mensaje:"Salió todo bien",
            servidor:req.body,
            insertado:response
        })
    }).catch((error:any)=>{
        res.status(201).json({
            mensaje:"Algo salió mal",
            respuesta:error
        })
    })
   // console.log(req)
})

router.post("/login",upload.any(),(req:Request,res:Response)=>{
    usuarioModelo.find({codigo:req.body.codigo}).exec().then(resultado=>{
        if(resultado.length > 0){                
            res.status(201).json({
                usuario:resultado
            })
                
        }else{
            res.status(201).json({
                usuario:[]
            })
        }
    }).catch(error=>{
        console.log("algo salió mal");
        console.log(error);
    })

})

export default module.exports=router