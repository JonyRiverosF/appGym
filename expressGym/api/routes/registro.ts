import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose, model } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';
import wspClient from "./complementos/wsp";
import horas from "./horas"
import modelos from "./modelos"
import correos from "./complementos/correos"




correos.iniciarCliente()
router.use(express.static("public"))
const directoryPath = "./public/videos/"


mongoose.connect("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")
.then(res=>{
    console.log("Conectado registro ts")
    var fechaHoy = new Date();
    fechaHoy.setHours(0,0,0);
    let contador = 1;
    if(fechaHoy.getDay() == 0){
        //Creación nuevos horarios para elegir
         modelos.horariosModelo.find({vigencia:true}).exec().then(async (resp:any)=>{
            if(resp.length>1){
                for(let x of resp){
                    const fechaHorario = new Date(x.fecha) 
                    if(fechaHorario < fechaHoy){
                        await modelos.horariosModelo.updateOne({fecha:x.fecha},{vigencia:false}).exec()
                    }
                } 
            }else{
                while(contador < 7){
                    modelos.horariosModelo.create({
                            fecha:new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate()+contador),
                            horas:horas,
                            vigencia:true
                        }).then(res=>{
                            console.log(res)
                        }).catch(e=>{
                            console.log("error");
                            console.log(e)
                        })
                    contador++
                }
              }
            })
            //Deshabilitar horarios escogidos 
            modelos.horariosElegidosModelo.updateMany({fechaInscripcion:{$lt:fechaHoy}},{
                vigencia:false
            }).exec()
        } 

}).catch(err=>{
    console.log("Algo salió mal");
    console.log(err);
})

var tendencia:any=[]
function ordenarRecom(re:any){
    var flag:any=[],flagDos:any=[];
    for(let i=0;i<re.recomendaciones.length;i++){
        var cont =0;
        if(!flagDos.includes(re.recomendaciones[i])){
            flagDos.push(re.recomendaciones[i])
            for(let a=0;a<re.recomendaciones.length;a++){
                if(re.recomendaciones[i]== re.recomendaciones[a]){
                    cont ++;
                }
            }
            tendencia.push([re.recomendaciones[i],cont]);
        }
    }
    flag = tendencia.slice();
    return flag.sort((a:any,b:any)=>a[1]-b[1]).reverse()[0];
}


router.post("/checkIn/:id",upload.any(),(req:Request,res:Response)=>{
    var rut = req.params.id;
    modelos.checkInModelo.findOne({usuario:rut,estado:"activo"}).exec().then(resp=>{
        if(resp == null){
            modelos.checkInModelo.create({
                usuario:rut,
                nombre:req.body.nombre,
                dia: new Date(),
                estado:"activo"
            }).then(respuesta=>{
                res.status(201).json(respuesta)
            }).catch(error=>{
                console.log(error);
                res.status(500).json({msj:"Algo salió mal"})
            })
        }else{
            res.status(201).json({})
        }
    })
})

router.post("/checkOut/:id",(req:Request,res:Response)=>{
    var rut = req.params.id,dietasRecomendadas:any=[];
    modelos.checkOutModelo.create({
        usuario:rut,
        dia:new Date()
    }).then(async respuesta=>{
        await modelos.checkInModelo.findOne({usuario:rut,estado:"activo"}).exec().then(async re=>{
            if(re != null){
                var flag = ordenarRecom(re);
                tendencia = flag
                if(flag[0] != "Cardio"){
                    await modelos.DietasModelo.find({tipoD:["Calorica","Mantención"],estado:"activado"}).exec().then(resp=>{
                       // console.log(resp)
                        dietasRecomendadas = resp
                    })
                }else{
                    await modelos.DietasModelo.find({tipoD:["Hipocalorica","Mantención"],estado:"activado"}).exec().then(resp=>{
                        //console.log(resp)
                        dietasRecomendadas = resp
                    })
                }
            }else{
                dietasRecomendadas = null;tendencia=null
            }
        })
        modelos.checkInModelo.updateMany({usuario:rut},{estado:"inactivo"}).exec().then(respu=>{
            res.status(201).json({dietasRecomendadas,tendencia});
        }).catch(error=>{
            console.log("algo salió mal cambiando estado checkin");console.log(error);
            res.status(500).json({msj:"algo salió mal"})
        })
    }).catch(error=>{
        console.log("Algo salió mal insertando checkout");console.log(error);
        res.status(500).json({msj:"Algo salió mal"})
    })
})

router.post("/CrearEjercicio",upload.array("video"),(req:any,res:Response)=>{

    if(req.files){
        for(let archivo of req.files){
            if(archivo.mimetype == "image/jpg" || archivo.mimetype == "image/jpeg" || archivo.mimetype == "image/png"){
            var portada = archivo.filename;
            fs.rename(directoryPath + archivo.filename , "./public/imagenes/MiniaturaEjercicios/" + archivo.filename + '.jpg', function(err) {
                if ( err ) console.log('ERROR: ' + err);
                })
            }else{
            var videosE = archivo.filename;
            fs.rename(directoryPath + archivo.filename , directoryPath + archivo.filename + '.mp4', function(err) {
                if ( err ) console.log('ERROR: ' + err);
                })
            }
        }
    }
    var insertado={info:"", video:""}

        insertado.info = req.body;
        insertado.video = req.files;

    modelos.EjerciciosModelo.create({
        Titulo:req.body.Titulo,
        ficha: req.body.ficha,
        estado:"activado",
        video:videosE + '.mp4',
        foto:portada + '.jpg',
        tipoMusculo:req.body.tipoMusculo,
        tipoMaquina:req.body.tipoMaquina,
        
    }).then(resultado=>{
        console.log("Insertado !!!!");
        res.status(201).json({
            message: "Estoy en nyajs post",
            creaste: insertado
        })
    }).catch(error=>{
        console.log("algo salió mal");
        console.log(error)
        res.status(201).json({
            message: "Algo salió mal",
            creaste: error
        })
    })
    
});




router.post("/CrearNoticia",upload.array("video"),(req:any,res:Response)=>{

    if(req.files){
        for(let archivo of req.files){
            if(archivo.mimetype == "image/jpg" || archivo.mimetype == "image/jpeg" || archivo.mimetype == "image/png"){
            var fotoN = archivo.filename;
            fs.rename(directoryPath + archivo.filename , "./public/imagenes/FotosNoticia/" + archivo.filename + '.jpg', function(err) {
                if ( err ) console.log('ERROR: ' + err);
                })
            }else{
            var videoN = archivo.filename;
            fs.rename(directoryPath + archivo.filename , directoryPath + archivo.filename + '.mp4', function(err) {
                if ( err ) console.log('ERROR: ' + err);
                })
            }
        }
    }
    var insertado={info:"", video:""}

        insertado.info = req.body;
        insertado.video = req.files;

        modelos.NoticiaModelo.create({
        tituloN:req.body.tituloN,
        bajadaN:req.body.bajadaN,
        fechaC:req.body.fechaC,
        descN:req.body.descN,
        estado:"activado",
        video:videoN + '.mp4',
        foto:fotoN + '.jpg',
        
        
    }).then(resultado=>{
        console.log("Insertado !!!!");
        console.log(resultado)
        res.status(201).json({
            message: "Noticia Insertada!!!",
            creaste: resultado
        })
    }).catch(error=>{
        console.log("algo salió mal");
        console.log(error)
        res.status(201).json({
            message: "Algo salió mal",
            creaste: error
        })
    })
    
});



router.post("/CrearMusculo", upload.single("foto"), (req: any, res: Response) => {

    if (!req.file || !req.file.mimetype.includes("image")) {
        return res.status(400).json({ error: "Archivo inválido. Debe ser una imagen." });
    }

    var foto = req.file.filename;
    fs.rename(directoryPath + req.file.filename, "./public/imagenes/fotosMusculos/" + req.file.filename + '.jpg', function(err) {
        if (err) {
            console.log('ERROR al renombrar archivo: ' + err);
            return res.status(500).json({ error: "Error al procesar el archivo." });
        }

        var insertado = {
            info: req.body
        };

        modelos.MusculoModelo.create({
            nombre: req.body.nombre,
            ficha: req.body.ficha,
            estado:"activado",
            foto: foto + '.jpg'
        }).then(resultado => {
            console.log("Insertado !!!");
            console.log(resultado);
            res.status(201).json({
                message: "Estoy en nyajs post",
                creaste: insertado
            });
        }).catch(error => {
            console.log("Algo salió mal al insertar:");
            console.log(error);
            res.status(500).json({ error: "Error al insertar en la base de datos." });
        });
    });
});


router.post("/CrearTipoDietas", upload.single("foto"), (req: any, res: Response) => {

    if (!req.file || !req.file.mimetype.includes("image")) {
        return res.status(400).json({ error: "Archivo inválido. Debe ser una imagen." });
    }

    var foto = req.file.filename;
    fs.rename(directoryPath + req.file.filename, "./public/imagenes/TipoDietas/" + req.file.filename + '.jpg', function(err) {
        if (err) {
            console.log('ERROR al renombrar archivo: ' + err);
            return res.status(500).json({ error: "Error al procesar el archivo." });
        }

        var insertado = {
            info: req.body
        };

        modelos.tipoDietasModelo.create({
            nombre: req.body.nombre,
            ficha: req.body.ficha,
            estado:"activado",
            foto: foto + '.jpg'
        }).then(resultado => {
            console.log("Insertado !!!");
            console.log(resultado);
            res.status(201).json({
                message: "Estoy en nyajs post",
                creaste: insertado
            });
        }).catch(error => {
            console.log("Algo salió mal al insertar:");
            console.log(error);
            res.status(500).json({ error: "Error al insertar en la base de datos." });
        });
    });
});



router.post("/CrearMaquina", upload.single("foto"), (req: any, res: Response) => {

    if (!req.file || !req.file.mimetype.includes("image")) {
        return res.status(400).json({ error: "Archivo inválido. Debe ser una imagen." });
    }

    var foto = req.file.filename;
    fs.rename(directoryPath + req.file.filename, "./public/imagenes/fotoMaquinas/" + req.file.filename + '.jpg', function(err) {
        if (err) {
            console.log('ERROR al renombrar archivo: ' + err);
            return res.status(500).json({ error: "Error al procesar el archivo." });
        }

        var insertado = {
            info: req.body
        };

        modelos.MaquinasModelo.create({
            nombre: req.body.nombre,
            ficha: req.body.ficha,
            estado:"activado",
            foto: foto + '.jpg'
        }).then(resultado => {
            console.log("Insertado !!!");
            console.log(resultado);
            res.status(201).json({
                message: "Estoy en nyajs post",
                creaste: insertado
            });
        }).catch(error => {
            console.log("Algo salió mal al insertar:");
            console.log(error);
            res.status(500).json({ error: "Error al insertar en la base de datos." });
        });
    });
});



router.post("/CrearDietas", upload.single("foto"), (req: any, res: Response) => {

    if (!req.file || !req.file.mimetype.includes("image")) {
        return res.status(400).json({ error: "Archivo inválido. Debe ser una imagen." });
    }

    var foto = req.file.filename;
    fs.rename(directoryPath + req.file.filename, "./public/imagenes/Dietas/" + req.file.filename+".jpg", function(err) {
        if (err) {
            console.log('ERROR al renombrar archivo: ' + err);
            return res.status(500).json({ error: "Error al procesar el archivo." });
        }

        var insertado = {
            info: req.body
        };

        modelos.DietasModelo.create({
            nombre: req.body.nombre,
            ficha: req.body.ficha,
            estado:"activado",
            tipoD: req.body.tipoD,
            foto: foto+".jpg",
            esVegetariana: req.body.esVegetariana,
            esVegano: req.body.esVegano,
            esCeliaco: req.body.esCeliaco
            
        }).then(resultado => {
            console.log("Insertado !!!");
            console.log(resultado);
            res.status(201).json({
                message: "Estoy en nyajs post",
                creaste: insertado
            });
        }).catch(error => {
            console.log("Algo salió mal al insertar:");
            console.log(error);
            res.status(500).json({ error: "Error al insertar en la base de datos." });
        });
    });
});




router.post("/registroUsuario",upload.single("fichaMedica"),(req:Request,res:Response)=>{
    try{
        var contador=0;var codigo = "";
        var codigoSeguridad="";
        while(contador < 4){
           codigo += String(Math.floor(Math.random()*10))
           codigoSeguridad += String(Math.floor(Math.random()*10))
           contador++;

        }
       /* console.log(req.body)
        console.log("------")
        console.log(req.file)
        console.log("------")*/
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
                    modelos.usuarioModelo.create({
                        codigo:codigo,
                        rut:req.body.rut,
                        nombre:req.body.nombre,
                        apellido:req.body.apellido,
                        correo:req.body.correo,
                        telefono:parseInt(req.body.telefono),
                        imagen:"",
                        fichaMedica:req.file?.filename+extension,
                        estado:"Por confirmar código de seguridad",
                        codigoSeguridad:codigoSeguridad,
                        observacionMedica:"",
                        warnings:3,
                        pago:false,
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
            modelos.usuarioModelo.create({
                codigo:codigo,
                rut:req.body.rut,
                dv:req.body.dv,
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                correo:req.body.correo,
                telefono:parseInt(req.body.telefono),
                imagen:"",
                fichaMedica:"",
                estado:"Por confirmar código de seguridad",
                codigoSeguridad:codigoSeguridad,
                observacionMedica:req.body.observacionMedica,
                warnings:3,
                pago:false,
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
        if(req.body.registroWeb=="true"){
            correos.enviarCodigoSeguridad(codigoSeguridad,req.body.correo,req.body.rut,req.body.registroWeb)    
        }else{
            let flag = "false";
            correos.enviarCodigoSeguridad(codigoSeguridad,req.body.correo,req.body.rut,flag)
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
        modelos.usuarioModelo.find({correo:req.body.correo,codigo:req.body.codigo}).exec().then(resultado=>{
            //console.log(req.body.codigo)
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


router.post("/crearHorario",upload.any(), async(req:Request,res:Response)=>{

    console.log(JSON.parse(req.body.horarioUno).hora)

    //Horario Uno
    var diaEscogidoU = JSON.parse(req.body.horarioUno).dia
    var horaEscogidaU = JSON.parse(req.body.horarioUno).hora
    for(let i=0;i<diaEscogidoU.horas.length;i++){
        if(diaEscogidoU.horas[i].hora == horaEscogidaU.hora){
            diaEscogidoU.horas[i].cuposElegidos +=1
        }
    }
    //Horario Dos
    var diaEscogidoD = JSON.parse(req.body.horarioDos).dia
    var horaEscogidaD = JSON.parse(req.body.horarioDos).hora
    for(let i=0;i<diaEscogidoD.horas.length;i++){
        if(diaEscogidoD.horas[i].hora == horaEscogidaD.hora){
            diaEscogidoD.horas[i].cuposElegidos +=1
        }
    }
    //Horario Tres
    var diaEscogidoT = JSON.parse(req.body.horarioTres).dia
    var horaEscogidaT = JSON.parse(req.body.horarioTres).hora
    for(let i=0;i<diaEscogidoT.horas.length;i++){
        if(diaEscogidoT.horas[i].hora == horaEscogidaT.hora){
            diaEscogidoT.horas[i].cuposElegidos +=1
        }
    }

    await modelos.horariosElegidosModelo.create({
         rutUsuario:req.body.rut,
         horarios:[
            {fecha:diaEscogidoU.fecha,hora:horaEscogidaU.hora},
            {fecha:diaEscogidoD.fecha,hora:horaEscogidaD.hora},
            {fecha:diaEscogidoT.fecha,hora:horaEscogidaT.hora}
        ],
        fechaInscripcion:new Date(),
        vigencia:true
    }).then(res=>{console.log("Insertado horarios elegidos")}).catch((e:any)=>{console.log(e)})

    await modelos.horariosModelo.findByIdAndUpdate(diaEscogidoU.id,diaEscogidoU).then(res=>{console.log("Modificadp H1")})
    .catch((e:any)=>{console.log(e)})

    await modelos.horariosModelo.findByIdAndUpdate(diaEscogidoD.id,diaEscogidoD).then(res=>{console.log("Modificadp H2")})
    .catch((e:any)=>{console.log(e)})

    await modelos.horariosModelo.findByIdAndUpdate(diaEscogidoT.id,diaEscogidoT).then(res=>{console.log("Modificadp H3")})
    .catch((e:any)=>{console.log(e)})

    res.status(201).json({
        respuesta:[diaEscogidoU,diaEscogidoD,diaEscogidoT]
    })
   // console.log([diaEscogidoU,diaEscogidoD,diaEscogidoT])


})

router.post("/guardarMultimedia",upload.any(),(req:Request,res:Response)=>{
    modelos.guardadosModelo.create({
        rutUsuario:req.body.rut,
        archivoGuardado:req.body.archivo,
        titulo:req.body.titulo,
        idArchivo:req.body.idAr,
        tipoArchivo:req.body.tipo
    }).then(respuesta=>{
        res.status(201).json({
            respuesta
        })
    }).catch(error=>{
        console.log(error)
    })
})

router.post("/insertarComentario",upload.any(),(req:any,res:any)=>{
    try{
        if(req.body.idComentarioPrincipal == "" && req.body.nombreCreador == ""){
            modelos.comentariosModel.create({
                descripcion:req.body.descripcion,
                idNoticia:req.body.noticia,
                creadorDelComentario:{
                    id:req.body.usuarioId,
                    nombre:req.body.usuarioName,
                    fotoPerfil:req.body.fotoUsuario
                },
                respuesta:{
                idComentarioPrincipal:"",
                respuestaPara:{
                    idReceptor:"",
                    nombreReceptor:""
                    }
                },
                estado:"activo"
            }).then(resultado=>{
                res.status(201).json({
                    reqBody:req.body,
                    insertado:resultado
                 })
            }).catch((error:any)=>{
                console.log("---------");
                console.log("Algo salió mal en el catch del crear comentario");
                console.log(error.toString());
                console.log("---------");
            })
        }else{
            modelos.comentariosModel.create({
                descripcion:req.body.descripcion,
                idNoticia:req.body.noticia,
                creadorDelComentario:{
                    id:req.body.usuarioId,
                    nombre:req.body.usuarioName,
                    fotoPerfil:req.body.fotoUsuario
                },
                respuesta:{
                idComentarioPrincipal:req.body.idComentarioPrincipal,
                respuestaPara:{
                    idReceptor:req.body.idCreador,
                    nombreReceptor:req.body.nombreCreador
                    }
                },
                estado:"activo"
            }).then(resultado=>{
                res.status(201).json({
                    reqBody:req.body,
                    insertado:resultado
                 })
            }).catch(error=>{
                console.log("---------");
                console.log("Algo salió mal insertado comentario anidado");
                console.log(error.toString());
                console.log("---------");
                res.status(500).json({
                    error:error.toString()
                })
            })
        }
    }catch(error:any){
        console.log("---------");
        console.log("Algo salió mal");
        console.log(error.toString());
        console.log("---------");
        res.status(500).json({
            error:error.toString()
        })
    }

})

router.post("/enviarSolicitud",upload.any(),(req:Request,res:Response)=>{
    modelos.solicitudModelo.create({
        usuario:req.body.nombre,
        correoUser:req.body.correo,
        asunto:req.body.asunto,
        detalle:req.body.detalle,
        fecha:new Date(),
        estado:"pendiente",
        respuestaAdmin:""
    }).then(respuesta=>{
        res.status(201).json({respuesta})
    }).catch(error=>{
        console.log("Algo salió mal");
        console.log(error);
        res.status(500).json({msj:"Algo salió mal",error})
    })
})

router.post("/enviarReporte",upload.any(),(req:Request,res:Response)=>{
    try{
        modelos.reportesModelo.create({
            rut:req.body.rut,
            userReportado:req.body.nombre,
            fotoPerfil:req.body.foto,
            comentario:req.body.comentario,
            estado:"activo",
            fechaEmision:new Date()
        }).then(respuesta=>{
            modelos.comentariosModel.findByIdAndUpdate(req.body.idComen,{
                reportado:true
            }).exec().then(respuesta=>{
                console.log(req.body.idComen)
                res.status(201).json({respuesta,msj:"Reporte exitoso"})
            }).catch(error=>{
                res.status(500).json(error);
            })
        })
    }catch(e:any){
       res.status(500).json(e)
    }
})
export default module.exports=router
//export default exports.usuariomodelo=usuarioModelo