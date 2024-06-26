import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';
import modelos from "./modelos"
const directoryPath = "./public/videos/"


router.get("/traerNoticias",(req:Request,res:Response)=>{
    modelos.NoticiaModelo.find({estado:"activado"}).exec().then(respuesta=>{
        res.status(200).json(respuesta)
    })
})

router.get("/traerMusculos",(req:Request,res:Response)=>{
   modelos.MusculoModelo.find({estado:"activado"}).then((respuesta)=>{
    res.status(200).json({
        respuesta
    })
   })
})

router.get("/traerMaquinas",(req:Request,res:Response)=>{
    modelos.MaquinasModelo.find({estado:"activado"}).then(respuesta=>{
        res.status(200).json({
            respuesta
        })
    })
})

router.get("/traerTipoDietas",(req:Request,res:Response)=>{
    modelos.tipoDietasModelo.find({estado:"activado"}).exec().then(respuesta=>{
        res.status(200).json(respuesta)
    })
})

router.get("/dietasPorTipo/:tipo",(req:Request,res:Response)=>{
    var tipoDieta = req.params.tipo
    modelos.DietasModelo.find({tipoD:tipoDieta,estado:"activado"}).exec().then(respuesta=>{
        res.status(200).json(respuesta)
    })
})

router.get("/ejerciciosPorMusculos/:musc",(req:Request,res:Response)=>{
    var musculo = req.params.musc
    modelos.EjerciciosModelo.find({tipoMusculo:musculo,estado:"activado"}).then(respuesta=>{
        res.status(200).json({
            respuesta
        })
    })
})

router.get("/ejerciciosPorMaquina/:maq",(req:Request,res:Response)=>{
    var maquina = req.params.maq;
    modelos.EjerciciosModelo.find({tipoMaquina:maquina,estado:"activado"}).exec().then(respuesta=>{
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
    var id = req.params.id; var noticia:any,comentarios:any
    modelos.NoticiaModelo.findById(id).exec().then(async respuesta=>{
        noticia = respuesta
        await modelos.comentariosModel.find({idNoticia:id,estado:"activo"}).exec().then(respuesta=>{
            comentarios = respuesta; 
            res.status(200).json({
                noticia,comentarios
            })
        })
        //res.status(200).json(respuesta)
    })
})

router.get("/traerGuardados/:id",(req:Request,res:Response)=>{
    var rut = req.params.id
    modelos.guardadosModelo.find({rutUsuario:rut}).exec().then(respuesta=>{
        res.status(200).json(respuesta)
    }).catch(error=>{
        console.log(error)
    })
})

router.post("/buscarSolicitudes",upload.any(),(req:Request,res:Response)=>{

    var id = req.params.id
    console.log(id)
    modelos.solicitudModelo.find({estado:"pendiente"}).then(respuesta=>{
        res.json({
            respuesta
        })
    }).catch (e=>{
        console.log(e)
    })
 })

router.post("/responderSoli/:id",upload.any(),(req:Request,res:Response)=>{

    var id = req.params.id
    console.log(id)
    modelos.solicitudModelo.find({_id:id}).then(respuesta=>{
        res.json({
            respuesta
        })
    }).catch (e=>{
        console.log(e)
    })
 })


export default module.exports = router;