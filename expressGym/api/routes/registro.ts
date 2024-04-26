import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';
import wspClient from "./complementos/wsp";

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




router.use(express.static("public"))
const directoryPath = "./public/videos/"


mongoose.connect("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")
.then(res=>{
    console.log("Conectado registro ts")
    /*wspClient.on("ready",()=>{
        wspClient.sendMessage("56968426213@c.us","nyaaaaa",).then(res=>{console.log(res)})
    })*/
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

        const emailLines = [
            'From: colinagym3@gmail.com',
            'To: '+req.body.correo,
            'Content-type: text/html;charset=iso-8859-1',
            'MIME-Version: 1.0',
            'Subject: Codigo de acceso al gimnasio',
            '',
            'Bienvenido '+req.body.nombre+' '+req.body.apellido +' al gimnasio municipal de colina. Tú código de acceso es el '+codigo
          ];
        
          const email = emailLines.join('\r\n').trim();
          const base64Email = Buffer.from(email).toString('base64');
        
         gmail.users.messages.send({
            userId:"colinagym3@gmail.com",
            requestBody:{
                raw:base64Email
            }
          })

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