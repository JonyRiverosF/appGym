import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';
import wspClient from "./complementos/wsp";
import modelos from "./modelos"

var usuarioModelo = modelos.usuarioModelo
var horariosElegidosModelo = modelos.horariosElegidosModelo



mongoose.connect("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")
.then(res=>{
    console.log("Conectado validaciones ts")
    /*wspClient.on("ready",()=>{
        wspClient.sendMessage("56968426213@c.us","nyaaaaa",).then(res=>{console.log(res)})
    })*/
}).catch(err=>{
    console.log("Algo salió mal");
    console.log(err);
})


router.post("/validarCorreo",upload.any(),(req:Request,res:Response)=>{
    usuarioModelo.find({correo:req.body.correo}).then((respuesta:any)=>{
         res.status(201).json({
            respuesta
         })
     }).catch((error:any)=>{
        console.log(error);
     })
})

router.post("/rutRepetido",upload.any(),(req:Request,res:Response)=>{
    usuarioModelo.find({rut:req.body.rut}).then((respuesta:any)=>{
         res.status(201).json({
            respuesta
         })
     }).catch((error:any)=>{
        console.log(error);
     })
})

router.get("/traerHorarios",(req:Request,res:Response)=>{
    modelos.horariosModelo.find({}).then(respuesta=>{
       res.status(200).json({
           respuesta
       })
    }).catch(e=>{
       console.log(e)
    })
})

router.post("/horariosTomados",upload.any(),(req:Request,res:Response)=>{
    horariosElegidosModelo.find({rutUsuario:req.body.rut,vigencia:true}).then(resp=>{
        res.status(201).json({
            resp
        })
    })
})

export default module.exports=router