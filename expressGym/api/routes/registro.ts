import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';

router.use(express.static("public"))
const directoryPath = "./public/videos/"

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
    observacionMedica:String,
    rol:String
})
var usuarioModelo = mongoose.model("Usuarios",usuariosSchema)

router.post("/registroUsuario",upload.single("fichaMedica"),(req:Request,res:Response)=>{
    try{
        var contador=0;var codigo = "";
        while(contador < 4){
           codigo += String(Math.floor(Math.random()*10))
           contador++;
        }
        console.log(req.body)
        console.log("------")
        console.log(req.file)
        console.log("------")
        if(req.file){
            var extension="";
            switch (req.file.mimetype){
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    extension = ".docx"
                    break;
                case 'application/pdf':
                    extension = ".pdf"
            }
            fs.rename(directoryPath + req.file?.filename , "./public/fichasMedicas/" + req.file?.filename+ extension, function(err) {
                if(err){
                   console.log(err)
                }else{
                    usuarioModelo.create({
                        codigo:codigo,
                        rut:req.body.rut,
                        dv:req.body.dv,
                        nombre:req.body.nombre,
                        apellido:req.body.apellido,
                        correo:req.body.correo,
                        telefono:parseInt(req.body.telefono),
                        imagen:"",
                        fichaMedica:req.file?.filename+extension,
                        observacionMedica:"",
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
                }
           })
        }else{
            usuarioModelo.create({
                codigo:codigo,
                rut:req.body.rut,
                dv:req.body.dv,
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                correo:req.body.correo,
                telefono:parseInt(req.body.telefono),
                imagen:"",
                fichaMedica:"",
                observacionMedica:req.body.observacionMedica,
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
        }

    }catch(error:any){
        console.log(error.message)
        res.status(400).json({
            error
        })
    }

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