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

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const accountTransport = require("./account_transport.json");


const oauth2Client = new OAuth2(
    accountTransport.auth.clientId,
    accountTransport.auth.clientSecret,
    "https://developers.google.com/oauthplayground",
);
oauth2Client.setCredentials({
    refresh_token: accountTransport.auth.refreshToken,
    tls: {
        rejectUnauthorized: false
    }
});
oauth2Client.getAccessToken((err:any, token:any) => {
    if (err)
        return console.log(err);;
    accountTransport.auth.accessToken = token;
});
const gmail = google.gmail({version: 'v1',auth: oauth2Client});


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

router.post("/validarUsuario",upload.any(),(req:Request,res:Response)=>{
    var codigoSeg = req.body.codigoSeg
    modelos.usuarioModelo.findOne({rut:req.body.rut}).exec().then(respuesta=>{
          if(respuesta?.codigoSeguridad == codigoSeg){
            modelos.usuarioModelo.findOneAndUpdate({rut:req.body.rut},{
                estado:"registrado"
            }).exec().then((resp:any)=>{
                const emailLines = [
                    'From: colinagym3@gmail.com',
                    'To: '+resp.correo,
                    'Content-type: text/html;charset=iso-8859-1',
                    'MIME-Version: 1.0',
                    'Subject: Codigo de acceso al gimnasio',
                    '',
                    'Hola '+resp.nombre+" "+resp.apellido+' Haz completado exitosamente tu registro en la App de colina gym. Puedes acceder a la aplicación '+
                    'mediante el siguiente código de acceso o con tu correo electrónico. Tu código de acceso es el: '+
                    resp.codigo
                  ];
                
                  const email = emailLines.join('\r\n').trim();
                  const base64Email = Buffer.from(email).toString('base64');
                
                 gmail.users.messages.send({
                    userId:"colinagym3@gmail.com",
                    requestBody:{
                        raw:base64Email
                    }
                  })
                res.status(201).json(resp)
            })
          }else{
            res.status(201).json({})
          }
    }).catch(error=>{
        console.log(error)
    })
})

export default module.exports=router