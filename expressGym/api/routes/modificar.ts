import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';
import modelos from "./modelos";


mongoose.connect("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")
.then(res=>{
    console.log("Conectado modificar ts")
}).catch(err=>{
    console.log("Algo salió mal");
    console.log(err);
})

const directoryPath = "./public/videos/"

router.get("/uwu",(req:Request,res:Response)=>{
    console.log(req);
})

router.put("/modificarHorario/:id",(req:Request,res:Response)=>{
    var id = req.params.id;
    const fecha = new Date();
    if(fecha.getDay() == 0){
        modelos.horariosElegidosModelo.findOneAndUpdate({rutUsuario:id,vigencia:true},{
            vigencia:false
        }).exec().then(respuesta=>{
            res.status(201).json({msg:"Modificado!!",respuesta})
        })
    }else{
        res.status(201).json("Aún está vigente el horario")
    }
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
    modelos.NoticiaModelo.find({_id:id}).then(respuesta=>{
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
    modelos.DietasModelo.find({_id:id}).then(respuesta=>{
        res.json({
            respuesta
        })
    }).catch (e=>{
        console.log(e)
    })
 })

 router.post("/buscarTipoDietas/:id",upload.any(),(req:Request,res:Response)=>{

    var id = req.params.id
    console.log(id)
    modelos.tipoDietasModelo.find({_id:id}).then(respuesta=>{
        res.json({
            respuesta
        })
    }).catch (e=>{
        console.log(e)
    })
 })

 router.post("/buscarMaquinas/:id",upload.any(),(req:Request,res:Response)=>{

    var id = req.params.id
    console.log(id)
    modelos.MaquinasModelo.find({_id:id}).then(respuesta=>{
        res.json({
            respuesta
        })
    }).catch (e=>{
        console.log(e)
    })
 })

 router.post("/buscarMusculos/:id",upload.any(),(req:Request,res:Response)=>{

    var id = req.params.id
    console.log(id)
    modelos.MusculoModelo.find({_id:id}).then(respuesta=>{
        res.json({
            respuesta
        })
    }).catch (e=>{
        console.log(e)
    })
 })

router.delete("/eliminarGuardado/:id/:rut",(req:Request,res:Response)=>{
    modelos.guardadosModelo.findOneAndDelete({idArchivo:req.params.id,rutUsuario:req.params.rut}).exec().then(respuesta=>{
        res.status(200).json(respuesta)
    }).catch(error=>{
        console.log(error)
    })
})

router.put("/modificarUsuario/:id",upload.any(),(req:Request,res:Response)=>{
    var id = req.params.id

    modelos.usuarioModelo.findOneAndUpdate({rut:id}, {
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        telefono:req.body.telefono,
        correo:req.body.correo,
        rol:req.body.rol,
        
    }).then(respuesta=>{
        res.status(200).json(respuesta)
    }).catch(error=>{
        console.log(error)
    })

})

router.put("/modificarEjercicio/:id", upload.array("video"), (req: any, res: Response) => {
    var id = req.params.id
    var portadaNueva = ""
    var VideoNuevo = ""

    modelos.EjerciciosModelo.findById(id).exec().then(respuesta => {

        if (req.files) {
            for (let archivo of req.files) {
                if (archivo.mimetype == "image/jpg" || archivo.mimetype == "image/jpeg" || archivo.mimetype == "image/png") {
                    var portada = archivo.filename;
                    fs.rename(directoryPath + archivo.filename, "./public/imagenes/MiniaturaEjercicios/" + archivo.filename + '.jpg', function (err) {
                        if (err) {
                            console.log('ERROR: ' + err);
                        } else {

                            portadaNueva = archivo.filename
                            fs.unlink("./public/imagenes/MiniaturaEjercicios/" + respuesta?.foto, function (error) {
                                if (error) {
                                    console.log("Algo salio mal eliminando la foto")
                                    console.log(error)
                                } else {
                                    modelos.EjerciciosModelo.findByIdAndUpdate(id, {
                                        foto: portadaNueva + '.jpg'

                                    }).exec().then(respuesta => {
                                        console.log("foto modificada")
                                    }).catch(error => {
                                        console.log("es la foto")
                                        console.log(error)
                                    })
                                }
                            })
                        }
                    })
                } else {
                    VideoNuevo = archivo.filename;
                    fs.rename(directoryPath + archivo.filename, directoryPath + archivo.filename + '.mp4', function (err) {
                        if (err) {

                            console.log('ERROR: ' + err);

                        } else {

                            VideoNuevo = archivo.filename 

                            fs.unlink("./public/videos/" + respuesta?.video, function (error) {
                                if (error) {
                                    console.log("Algo salio mal eliminando en el video")
                                    console.log(error)
                                } else {
                                    modelos.EjerciciosModelo.findByIdAndUpdate(id, {
                                        video: VideoNuevo + '.mp4'

                                    }).exec().then(respuesta => {
                                        console.log("video modificado")
                                    }).catch(error => {
                                        console.log("es el video")
                                        console.log(error)
                                    })
                                }
                            })
                        }
                    })
                }
            }
        }

        modelos.EjerciciosModelo.findByIdAndUpdate(id, {
            Titulo: req.body.titulo
        }).exec().then(respuesta => {
            res.status(201).json(respuesta)
        })
    })

})




 







export default module.exports=router