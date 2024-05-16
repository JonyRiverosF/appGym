import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';
import wspClient from "./complementos/wsp";
import modelos from "./modelos"
import correso from "./complementos/correos"
import correos from "./complementos/correos";

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
    modelos.horariosModelo.find({vigencia:true}).then(respuesta=>{
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

router.post("/validarUsuario",upload.any(),(req:Request,res:Response)=>{
    var codigoSeg = req.body.codigoSeg
    modelos.usuarioModelo.findOne({rut:req.body.rut}).exec().then(respuesta=>{
          if(respuesta?.codigoSeguridad == codigoSeg){
            modelos.usuarioModelo.findOneAndUpdate({rut:req.body.rut},{
                estado:"registrado"
            }).exec().then((resp)=>{
                correos.enviarCodigoAcceso(resp?.codigo,resp?.correo,resp)
                res.status(201).json(resp)
            })
          }else{
            res.status(201).json({})
          }
    }).catch(error=>{
        console.log(error)
    })
})

router.post("/respuestaSoli/:id",upload.any(),(req:Request,res:Response)=>{
    var id =req.params.id
    modelos.solicitudModelo.findByIdAndUpdate(id,{
        respuestaAdmin:req.body.respuestaAdmin,
        estado:"respondido",
    }).exec().then((resp)=>{
        correos.respuestSolicitud(resp?.correoUser,resp?.usuario,req.body.respuestaAdmin,resp?.asunto)
    }).catch(error=>{
        console.log(error)
    }) 
})

export default module.exports=router