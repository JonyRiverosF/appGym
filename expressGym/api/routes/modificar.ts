import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';
import modelos from "./modelos";
import NoticiaModelo from './registro';
import DietasModelo from './registro';

mongoose.connect("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")
.then(res=>{
    console.log("Conectado modificar ts")
}).catch(err=>{
    console.log("Algo salió mal");
    console.log(err);
})

const directoryPath = "./public/videos/"


router.post("/modificarHorario",upload.any(),(req:Request,res:Response)=>{
    
   // console.log(req)
})

router.post("/buscarEjercicio/:id",upload.any(),(req:Request,res:Response)=>{

    var id = req.params.id
    console.log(id)
    modelos.EjerciciosModelo.find({_id:id}).then(respuesta=>{
        res.json({
            respuesta
        })
    }).catch (e=>{
        console.log(e)
    })
 })

 router.post("/buscarNoticia/:id",upload.any(),(req:Request,res:Response)=>{

    var id = req.params.id
    console.log(id)
    NoticiaModelo.NoticiaModelo.find({_id:id}).then(respuesta=>{
        res.json({
            respuesta
        })
    }).catch (e=>{
        console.log(e)
    })
 })

 router.post("/buscarDietas/:id",upload.any(),(req:Request,res:Response)=>{

    var id = req.params.id
    console.log(id)
    DietasModelo.DietasModelo.find({_id:id}).then(respuesta=>{
        res.json({
            respuesta
        })
    }).catch (e=>{
        console.log(e)
    })
 })


 







export default module.exports=router