import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';
import EjerciciosModelo from './registro';
import NoticiaModelo from './registro';
import DietasModelo from './registro';
import modelos from "./modelos"
const directoryPath = "./public/videos/"


router.get("/traerNoticias",(req:Request,res:Response)=>{
    modelos.NoticiaModelo.find({}).exec().then(respuesta=>{
        res.status(200).json(respuesta)
    })
})

router.get("/traerMusculos",(req:Request,res:Response)=>{
   modelos.MusculoModelo.find({}).then((respuesta)=>{
    res.status(200).json({
        respuesta
    })
   })
})

router.get("/traerMaquinas",(req:Request,res:Response)=>{
    modelos.MaquinasModelo.find({}).then(respuesta=>{
        res.status(200).json({
            respuesta
        })
    })
})

router.get("/traerTipoDietas",(req:Request,res:Response)=>{
    modelos.tipoDietasModelo.find({}).exec().then(respuesta=>{
        res.status(200).json(respuesta)
    })
})

router.get("/dietasPorTipo/:tipo",(req:Request,res:Response)=>{
    var tipoDieta = req.params.tipo
    modelos.DietasModelo.find({tipoD:tipoDieta}).exec().then(respuesta=>{
        res.status(200).json(respuesta)
    })
})

router.get("/ejerciciosPorMusculos/:musc",(req:Request,res:Response)=>{
    var musculo = req.params.musc
    modelos.EjerciciosModelo.find({tipoMusculo:musculo}).then(respuesta=>{
        res.status(200).json({
            respuesta
        })
    })
})

router.get("/ejerciciosPorMaquina/:maq",(req:Request,res:Response)=>{
    var maquina = req.params.maq;
    modelos.EjerciciosModelo.find({tipoMaquina:maquina}).exec().then(respuesta=>{
        res.status(200).json(respuesta)
    })
})

router.get("/detalleEjercicio/:id",(req:Request,res:Response)=>{
    var id = req.params.id
    modelos.EjerciciosModelo.findById(id).exec().then(respuesta=>{
        res.status(200).json(
            respuesta
        )
    })
})

router.get("/detalleDieta/:id",(req:Request,res:Response)=>{
    var id = req.params.id
    modelos.DietasModelo.findById(id).exec().then(respuesta=>{
        res.status(200).json(respuesta)
    })
})

router.get("/detalleNoticia/:id",(req:Request,res:Response)=>{
    var id = req.params.id
    modelos.NoticiaModelo.findById(id).exec().then(respuesta=>{
        res.status(200).json(respuesta)
    })
})
export default module.exports = router;