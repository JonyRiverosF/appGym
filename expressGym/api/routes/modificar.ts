import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';

mongoose.connect("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")
.then(res=>{
    console.log("Conectado modificar ts")
}).catch(err=>{
    console.log("Algo salió mal");
    console.log(err);
})

var horariosElegidos = new mongoose.Schema({
    rutUsuario:String,
    horarios:{
        horarioUno:{fecha:String,hora:String},
        horarioDos:{fecha:String,hora:String},
        horarioTres:{fecha:String,hora:String}
    },
    fechaInscripcion:String

})
var horariosElegidosModelo = mongoose.model("HorariosElegidos",horariosElegidos)

router.post("/modificarHorario",upload.any(),(req:Request,res:Response)=>{
    
   // console.log(req)
})

export default module.exports=router