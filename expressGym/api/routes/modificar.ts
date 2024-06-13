import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';
import modelos from "./modelos";
import correos from "./complementos/correos";


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

router.put("/agregarRecomen",upload.any(),(req:Request,res:Response)=>{
    modelos.checkInModelo.findOne({usuario:req.body.rut,estado:"activo"}).exec().then(resp=>{
        if(resp != null){
            var recom = resp.recomendaciones
            recom.push(req.body.musculo);
            modelos.checkInModelo.updateOne({usuario:req.body.rut,estado:"activo"},{recomendaciones:recom}).exec().then(respuesta=>{
               console.log(respuesta);
               res.status(201).json(respuesta)
            }).catch(error=>{
                console.log("Algo salió mal");
                console.log(error);
                res.status(500).json(error)
            })
        }else{
           res.status(201).json("inactivo")
        }
    }).catch(error=>{
        console.log("Algo salió mal");
        console.log(error);
        res.status(500).json(error)
    })
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
                                        modelos.guardadosModelo.findOneAndUpdate({idArchivo:id},{
                                            archivoGuardado:portadaNueva +".jpg"
                                        }).exec().then(respu=>{
                                            console.log("foto modificada de los guardados")
                                        })
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
            Titulo: req.body.titulo,
            ficha:req.body.ficha,
            tipoMusculo:req.body.tipoMusculo,
            tipoMaquina:req.body.tipoMaquina,
        }).exec().then(respuesta => {
            res.status(201).json(respuesta)
        })
    })

})


router.put("/modificarNoticia/:id", upload.array("video"), (req: any, res: Response) => {
    var id = req.params.id  
    var portadaNueva = ""
    var VideoNuevo = ""
  
    modelos.NoticiaModelo.findById(id).exec().then(respuesta => {

        if (req.files) {
            for (let archivo of req.files) {
                if (archivo.mimetype == "image/jpg" || archivo.mimetype == "image/jpeg" || archivo.mimetype == "image/png") {
                    var portada = archivo.filename;
                    fs.rename(directoryPath + archivo.filename, "./public/imagenes/FotosNoticia/" + archivo.filename + '.jpg', function (err) {
                        if (err) {
                            console.log('ERROR: ' + err);
                        } else {

                            portadaNueva = archivo.filename
                            fs.unlink("./public/imagenes/FotosNoticia/" + respuesta?.foto, function (error) {
                                if (error) {
                                    console.log("Algo salio mal eliminando la foto")
                                    console.log(error)
                                } else {
                                    modelos.NoticiaModelo.findByIdAndUpdate(id, {
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
                                    modelos.NoticiaModelo.findByIdAndUpdate(id, {
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

        modelos.NoticiaModelo.findByIdAndUpdate(id, {
            tituloN: req.body.tituloN,
            bajadaN: req.body.bajadaN,
            fechaC: req.body.fechaC,
            descN: req.body.descN,

        }).exec().then(respuesta => {
            res.status(201).json(respuesta)
            console.log(id)
            console.log(respuesta)
        })
    })

})


router.put("/modificarMusculo/:id", upload.single("foto"), (req: any, res: Response) => {
    var id = req.params.id;
    var portadaNueva=""

    modelos.MusculoModelo.findById(id).exec().then(respuesta => {
        if (!respuesta) {
            return res.status(404).json({ mensaje: "Músculo no encontrado" });
        }

        // Actualizar la foto si se seleccionó una nueva
        if (req.file) {
            var archivo = req.file;
            if (archivo.mimetype == "image/jpg" || archivo.mimetype == "image/jpeg" || archivo.mimetype == "image/png") {
                
                fs.rename(directoryPath + archivo.filename, "./public/imagenes/fotosMusculos/" + archivo.filename + '.jpg', function (err) {
                    if (err) {
                        console.log('ERROR: ' + err);
                        res.status(500).json({ mensaje: "Error al guardar la nueva foto" });
                    } else {

                        portadaNueva = archivo.filename
                        fs.unlink("./public/imagenes/fotosMusculos/" + respuesta?.foto, function (error) {
                            if (error) {
                                console.log("Algo salio mal eliminando la foto")
                                console.log(error)
                            } else {
                                modelos.MusculoModelo.findByIdAndUpdate(id, {
                                    foto: portadaNueva + '.jpg'
    
                                }).exec().then(respuesta => {
                                    console.log("foto modificada")
                                }).catch(error => {
                                    console.log("es la foto")
                                    console.log(error)
                                })
                            }
                        })
                        
                        // Actualizar el músculo con los nuevos datos
                        
                        modelos.MusculoModelo.findByIdAndUpdate(id, {
                            nombre: req.body.nombre,
                            foto: respuesta.foto,
                            ficha:req.body.ficha,
                        }).exec().then(respuesta => {

                            res.status(201).json(respuesta);
                        }).catch(error => {
                            console.log("Error al actualizar el músculo");
                            console.log(error);
                            res.status(500).json({ mensaje: "Error al actualizar el músculo" });
                        });
                    }
                });
            } else {
                return res.status(400).json({ mensaje: "El archivo subido no es una imagen válida" });
            }
        } else {
            // No se subió una nueva foto, simplemente actualizar el músculo con los nuevos datos
            modelos.MusculoModelo.findByIdAndUpdate(id, {
                nombre: req.body.nombre,
                ficha:req.body.ficha,
            }).exec().then(respuesta => {
                res.status(201).json(respuesta);
            }).catch(error => {
                console.log("Error al actualizar el músculo");
                console.log(error);
                res.status(500).json({ mensaje: "Error al actualizar el músculo" });
            });
        }
    }).catch(error => {
        console.log("Error al buscar el músculo");
        console.log(error);
        res.status(500).json({ mensaje: "Error al buscar el músculo" });
    });
});


router.put("/modificarTiposDietas/:id", upload.single("foto"), (req: any, res: Response) => {
    var id = req.params.id;
    var portadaNueva=""
    console.log(id)
    console.log(req.file)
    modelos.tipoDietasModelo.findById(id).exec().then(respuesta => {
        if (!respuesta) {
            return res.status(404).json({ mensaje: "Tipo Dieta no encontrada" });
        }

        if (req.file) {
            var archivo = req.file;
            if (archivo.mimetype == "image/jpg" || archivo.mimetype == "image/jpeg" || archivo.mimetype == "image/png") {
                
                fs.rename(directoryPath + archivo.filename, "./public/imagenes/TipoDietas/" + archivo.filename + '.jpg', function (err) {
                    if (err) {
                        console.log('ERROR: ' + err);
                        res.status(500).json({ mensaje: "Error al guardar la nueva foto" });
                    } else {

                        portadaNueva = archivo.filename
                        fs.unlink("./public/imagenes/TipoDietas/" + respuesta?.foto, function (error) {
                            if (error) {
                                console.log("Algo salio mal eliminando la foto")
                                console.log(error)
                            } else {
                                modelos.tipoDietasModelo.findByIdAndUpdate(id, {
                                    foto: portadaNueva + '.jpg'
    
                                }).exec().then(respuesta => {
                                    console.log("foto modificada")
                                }).catch(error => {
                                    console.log("es la foto")
                                    console.log(error)
                                })
                            }
                        })
                        
                        
                        modelos.tipoDietasModelo.findByIdAndUpdate(id, {
                            nombre: req.body.nombre,
                            foto: respuesta.foto,
                            ficha: req.body.ficha,
                        }).exec().then(respuesta => {

                            res.status(201).json(respuesta);
                        }).catch(error => {
                            console.log("Error al actualizar el Tipo de Dieta");
                            console.log(error);
                            res.status(500).json({ mensaje: "Error al actualizar el Tipo De Dieta" });
                        });
                    }
                });
            } else {
                return res.status(400).json({ mensaje: "El archivo subido no es una imagen válida" });
            }
        } else {

            modelos.tipoDietasModelo.findByIdAndUpdate(id, {
                nombre: req.body.nombre,
                ficha: req.body.ficha,
            }).exec().then(respuesta => {
                res.status(201).json(respuesta);
            }).catch(error => {
                console.log("Error al actualizar el Tipo De Dieta");
                console.log(error);
                res.status(500).json({ mensaje: "Error al actualizar el Tipo De Dieta" });
            });
        }
    }).catch(error => {
        console.log("Error al buscar el Tipo De Dieta");
        console.log(error);
        res.status(500).json({ mensaje: "Error al buscar el Tipo De Dieta" });
    });
});



router.put("/modificarMaquina/:id", upload.single("foto"), (req: any, res: Response) => {
    var id = req.params.id;
    var portadaNueva=""

    modelos.MaquinasModelo.findById(id).exec().then(respuesta => {
        if (!respuesta) {
            return res.status(404).json({ mensaje: "Maquinas no encontrada" });
        }

        if (req.file) {
            var archivo = req.file;
            if (archivo.mimetype == "image/jpg" || archivo.mimetype == "image/jpeg" || archivo.mimetype == "image/png") {
                
                fs.rename(directoryPath + archivo.filename, "./public/imagenes/fotoMaquinas/" + archivo.filename + '.jpg', function (err) {
                    if (err) {
                        console.log('ERROR: ' + err);
                        res.status(500).json({ mensaje: "Error al guardar la nueva foto" });
                    } else {

                        portadaNueva = archivo.filename
                        fs.unlink("./public/imagenes/fotoMaquinas/" + respuesta?.foto, function (error) {
                            if (error) {
                                console.log("Algo salio mal eliminando la foto")
                                console.log(error)
                            } else {
                                modelos.MaquinasModelo.findByIdAndUpdate(id, {
                                    foto: portadaNueva + '.jpg'
    
                                }).exec().then(respuesta => {
                                    console.log("foto modificada")
                                }).catch(error => {
                                    console.log("es la foto")
                                    console.log(error)
                                })
                            }
                        })
                        
                        
                        modelos.MaquinasModelo.findByIdAndUpdate(id, {
                            nombre: req.body.nombre,
                            foto: respuesta.foto,
                            ficha: req.body.ficha,
                        }).exec().then(respuesta => {

                            res.status(201).json(respuesta);
                        }).catch(error => {
                            console.log("Error al actualizar las maquinas");
                            console.log(error);
                            res.status(500).json({ mensaje: "Error al actualizar las maquinas " });
                        });
                    }
                });
            } else {
                return res.status(400).json({ mensaje: "El archivo subido no es una imagen válida" });
            }
        } else {

            modelos.MaquinasModelo.findByIdAndUpdate(id, {
                nombre: req.body.nombre,
                ficha: req.body.ficha,
            }).exec().then(respuesta => {
                res.status(201).json(respuesta);
            }).catch(error => {
                console.log("Error al actualizar las maquinas");
                console.log(error);
                res.status(500).json({ mensaje: "Error al actualizar las maquinas" });
            });
        }
    }).catch(error => {
        console.log("Error al buscar las maquinas");
        console.log(error);
        res.status(500).json({ mensaje: "Error al buscar las maquinas" });
    });
});


router.put("/modificarDietas/:id", upload.single("foto"), (req: any, res: Response) => {
    var id = req.params.id;
    var portadaNueva=""

    modelos.DietasModelo.findById(id).exec().then(respuesta => {
        if (!respuesta) {
            return res.status(404).json({ mensaje: "Dietas no encontrada" });
        }

        if (req.file) {
            var archivo = req.file;
            if (archivo.mimetype == "image/jpg" || archivo.mimetype == "image/jpeg" || archivo.mimetype == "image/png") {
                
                fs.rename(directoryPath + archivo.filename, "./public/imagenes/Dietas/" + archivo.filename + '.jpg', function (err) {
                    if (err) {
                        console.log('ERROR: ' + err);
                        res.status(500).json({ mensaje: "Error al guardar la nueva foto" });
                    } else {

                        portadaNueva = archivo.filename
                        fs.unlink("./public/imagenes/Dietas/" + respuesta?.foto, function (error) {
                            if (error) {
                                console.log("Algo salio mal eliminando la foto")
                                console.log(error)
                            } else {
                                modelos.DietasModelo.findByIdAndUpdate(id, {
                                    foto: portadaNueva + '.jpg'
    
                                }).exec().then(respuesta => {
                                    console.log("foto modificada")
                                }).catch(error => {
                                    console.log("es la foto")
                                    console.log(error)
                                })
                            }
                        })
                        
                        
                        modelos.DietasModelo.findByIdAndUpdate(id, {
                            nombre: req.body.nombre,
                            foto: respuesta.foto,
                            ficha: req.body.ficha,
                            tipoD:req.body.tipoD,
                            esVegetariana: req.body.esVegetariana,
                            esVegano: req.body.esVegano,
                            esCeliaco: req.body.esCeliaco
                        }).exec().then(respuesta => {

                            res.status(201).json(respuesta);
                        }).catch(error => {
                            console.log("Error al actualizar las dietas");
                            console.log(error);
                            res.status(500).json({ mensaje: "Error al actualizar las dietas " });
                        });
                    }
                });
            } else {
                return res.status(400).json({ mensaje: "El archivo subido no es una imagen válida" });
            }
        } else {

            modelos.DietasModelo.findByIdAndUpdate(id, {
                nombre: req.body.nombre,
                ficha: req.body.ficha,
                tipoD:req.body.tipoD,
                esVegetariana: req.body.esVegetariana,
                esVegano: req.body.esVegano,
                esCeliaco: req.body.esCeliaco
            }).exec().then(respuesta => {
                res.status(201).json(respuesta);
            }).catch(error => {
                console.log("Error al actualizar las dietas");
                console.log(error);
                res.status(500).json({ mensaje: "Error al actualizar las dietas" });
            });
        }
    }).catch(error => {
        console.log("Error al buscar las dietas");
        console.log(error);
        res.status(500).json({ mensaje: "Error al buscar las dietas" });
    });
});

router.post("/activarNoticia/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.NoticiaModelo.findByIdAndUpdate(id,{
        estado:"activado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado de la noticia");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado de la noticia" });
    });
})

router.post("/desactivarNoticia/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.NoticiaModelo.findByIdAndUpdate(id,{
        estado:"desactivado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado de la noticia");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado de la noticia" });
    });
})




router.post("/activarEjercicio/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.EjerciciosModelo.findByIdAndUpdate(id,{
        estado:"activado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado del ejercicio");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado del ejercicio" });
    });
})

router.post("/desactivarEjercicio/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.EjerciciosModelo.findByIdAndUpdate(id,{
        estado:"desactivado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado del ejercicio");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado del ejercicio" });
    });
})



router.post("/activarMusculo/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.MusculoModelo.findByIdAndUpdate(id,{
        estado:"activado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado del Musculo");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado del Musculo" });
    });
})

router.post("/desactivarMusculo/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.MusculoModelo.findByIdAndUpdate(id,{
        estado:"desactivado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado del Musculo");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado del Musculo" });
    });
})



router.post("/activarMaquinas/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.MaquinasModelo.findByIdAndUpdate(id,{
        estado:"activado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado de la maquina");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado de la maquina" });
    });
})

router.post("/desactivarMaquinas/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.MaquinasModelo.findByIdAndUpdate(id,{
        estado:"desactivado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado de la maquina");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado de la maquina" });
    });
})




router.post("/activarDieta/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.DietasModelo.findByIdAndUpdate(id,{
        estado:"activado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado de la dieta");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado de la dieta" });
    });
})

router.post("/desactivarDieta/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.DietasModelo.findByIdAndUpdate(id,{
        estado:"desactivado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado de la dieta");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado de la dieta" });
    });
})




router.post("/activarTipoD/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.tipoDietasModelo.findByIdAndUpdate(id,{
        estado:"activado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado del tipo dieta");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado del tipo dieta" });
    });
})

router.post("/desactivarTipoD/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.tipoDietasModelo.findByIdAndUpdate(id,{
        estado:"desactivado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado del tipo dieta");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado del tipo dieta" });
    });
})


router.post("/anularComentario/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.reportesModelo.findByIdAndUpdate(id,{
        estado:"anulado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado del reporte");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado del reporte" });
    });
})

router.post("/advertirComentario/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;var warnings:any;
    console.log(req.body.id)
    modelos.reportesModelo.findByIdAndUpdate(id,{
        estado:"desactivado",

    }).exec().then(respuesta => {
        modelos.comentariosModel.findOneAndUpdate({creadorDelComentario:{id:respuesta?.rut,nombre:respuesta?.userReportado,fotoPerfil:""},descripcion:respuesta?.comentario},
            {estado:"desactivado"}
        ).exec().then(resp=>{
            //console.log(resp)
            modelos.usuarioModelo.findOne({rut:respuesta?.rut}).exec().then((respu:any)=>{
                warnings = respu.warnings -1
                //console.log(respu.warnings+ "----"+ warnings)
                modelos.usuarioModelo.findOneAndUpdate({rut:respuesta?.rut},{warnings}).exec().then(enviar=>{
                    if(warnings == 0){
                        correos.banearUser(enviar?.correo);
                        modelos.reportesModelo.updateMany({rut:enviar?.rut},{
                            estado:"desactivado"
                        }).exec()
                    }else{
                        correos.adverComentario(enviar?.correo,warnings,respuesta?.comentario)
                    }
                    res.status(201).json(respuesta);
                })
            })
           })
        })

    .catch(error => {
        console.log("Error al actualizar el estado del reporte");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado del reporte" });
    });
    
})

router.post("/banearComentario/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.reportesModelo.findByIdAndUpdate(id,{
        estado:"desactivado",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado del reporte");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado del reporte" });
    });
})





 







export default module.exports=router