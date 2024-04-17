import express from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';

//Conexión a la base de datos
mongoose.connect("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")
.then(res=>{
    console.log("conectado")
}).catch(error=>{
    console.log(error)
})
var preguntasSchema = new mongoose.Schema({
    pregunta:String
})

var preguntas = mongoose.model("Preguntas",preguntasSchema)

var peliculaSchema = new mongoose.Schema({
    titulo : String,
    director:String,
    estreno:String,
    genero:String,
    portada:String,
    pelicula:String
})
var peliculaEjemplo = mongoose.model("Pelicula",peliculaSchema)

var usuariosSchema = new mongoose.Schema({
    nombre:String,
    correo:String,
    clave:String,
    fechaNacimiento:String,
    pregunta:String,
    respuesta:String,
    imagen:String,
    rol:String
})
var usuarioModelo = mongoose.model("Usuarios",usuariosSchema)

var meGustaSchema = new mongoose.Schema({
    idUsuario:String,
    idPelicula:String,
    fecha:String
});
var likes = mongoose.model("meGusta",meGustaSchema)

var noMeGustaSchema = new mongoose.Schema({
    idUsuario:String,
    idPelicula:String,
    fecha:String
});
var dislikes = mongoose.model("noMeGusta",noMeGustaSchema)

var comentarioSchema = new mongoose.Schema({
    descripcion:String,
    idPelicula:String,
    creadorDelComentario:{
        id:String,
        nombre:String,
        fotoPerfil:String
    },
    respuesta:{
        idComentarioPrincipal:String,
        respuestaPara:{
            idReceptor:String,
            nombreReceptor:String
        }
    }

});

var comentariosModel = mongoose.model("Comentarios",comentarioSchema);

var lista:any = []
var insertado = {
    info:"",
    video:null
}

//requiring path and fs modules


router.use(express.static("public"))

//joining path of directory 
const directoryPath = "./public/videos/"
function leerDirectorio(){
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('No se puede ver el directorio: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            lista.push(file)
            // Do whatever you want to do with the file
        });
        console.log(lista)
        })
}
//Método POST 
    router.post('/',upload.array("video"),(req:any,res:any,next)=>{
        for(let archivo of req.files){
            if(archivo.mimetype == "image/jpg" || archivo.mimetype == "image/jpeg" || archivo.mimetype == "image/png"){
            var portada = archivo.filename;
            fs.rename(directoryPath + archivo.filename , "./public/images/portadas/" + archivo.filename, function(err) {
                if ( err ) console.log('ERROR: ' + err);
                })
            }else{
            var pelicula = archivo.filename;
            }
        }
        insertado.info = req.body;
        insertado.video = req.files
        
        peliculaEjemplo.create({
            titulo:req.body.titulo,
            director:req.body.director,
            estreno:req.body.fecha,
            genero:req.body.genero,
            portada:portada,
            pelicula:pelicula
        }).then(resultado=>{
            console.log("Insertado !!!!");
            console.log(resultado)
        }).catch(error=>{
            console.log("algo salió mal");
            console.log(error)
        })
        res.status(201).json({
            message: "Estoy en nyajs post",
            creaste: insertado
        })
        
    });
    router.post("/login",upload.any(),async (req,res)=>{
        //console.log(req)
           
            usuarioModelo.find({correo:req.body.correo}).exec().then(resultado=>{
                if(resultado.length > 0){
                    bcrypt.compare(req.body.clave,String(resultado[0].clave))
                    .then(coincidencias=>{
                        if(coincidencias){
                            res.status(201).json({
                                usuario:resultado
                            })
                        }else{
                            res.status(201).json({
                                usuario:[1]
                            })
                        }
                    }).catch(error=>{
                        console.log(error.toString())
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
    //Modificar
    router.post("/modificarPelicula/:id",upload.array("video"),(req:any,res:any)=>{
        //console.log(req.files);
        const idPelicula = req.params.id    
        var portadaNueva:string;var nuevoVideo:string
        peliculaEjemplo.findById(idPelicula).exec().then((pelicula:any)=>{
            if(req.files.length >0){
                for(let archivo of req.files){
                    if(archivo.mimetype == "image/jpg" || archivo.mimetype == "image/jpeg" || archivo.mimetype == "image/png"){
                        //Aquí se traslada el archivo enviado desde la carpeta videos hacia la carpeta images
                        fs.rename(directoryPath  + archivo.filename , "./public/images/portadas/" + archivo.filename, function(err) {
                            if ( err ){
                            console.log('ERROR: ' + err);
                            }else{
                                portadaNueva = archivo.filename
                                //Se elimina la portada anterior de la pelicula
                                fs.unlink("./public/images/portadas/"  + pelicula.portada,function(error){
                                        if(error){
                                            console.log("Algo salió mal eliminando el archivo");
                                            console.log(error)
                                        }else{
                                            peliculaEjemplo.findByIdAndUpdate(idPelicula,{portada:portadaNueva}).exec()
                                            .then(res=>{
                                                console.log("Foto modificada")
                                            })
                                        }
                                    })
                                }
                            })
            
                    }else{
                        nuevoVideo = archivo.filename
                        //Se elimina el video anterior de la pelicula
                        fs.unlink(directoryPath + pelicula.pelicula,function(error){
                            if(error){
                                console.log("Algo salió mal eliminando el archivo");
                                console.log(error)
                            }else{
                                peliculaEjemplo.findByIdAndUpdate(idPelicula,{pelicula:nuevoVideo}).exec()
                                .then(res=>{
                                    console.log("Video modificado")
                                })
                            }

                        })
                    }
                }
                //Se actualizan los datos de la pelicula
                peliculaEjemplo.findByIdAndUpdate(idPelicula,{
                    titulo:req.body.titulo,
                    director:req.body.director,
                    estreno:req.body.fecha,
                    genero:req.body.genero
                }).exec()
                .then(resultado=>{
                res.status(201).json({
                        mensaje:resultado,
                        multi:req.files,
                        body:req.body
                    })
                console.log(resultado)
                })
        }else{
            //Cuando no se envíe archivos de multimedia, se modificarán todos los datos del documento de la pelicula
            //menos los relacionados con los archivos de multimedia 
            peliculaEjemplo.findByIdAndUpdate(idPelicula,{
                titulo:req.body.titulo,
                director:req.body.director,
                estreno:req.body.fecha,
                genero:req.body.genero
            }).exec()
            .then(resultado=>{
                res.status(201).json({
                    mensaje:resultado,
                    body:req.body
                    })
            })
            }
        })
        // leerDirectorio()
        
       // console.log(req.files.length)
    })
    router.post("/modificarUsuario/:id",upload.single("fotoPerfil"),async (req:any,res:any)=>{
        try{
            var idUsuario = req.params.id
            //Este if será true cuando el usuario haya enviado una foto nueva, de lo contrario,
            //solamente se modificará otros datos menos la imagen de perfil
            if(req.file){
                fs.rename(directoryPath + req.file.filename , "./public/images/fotosPerfil/" + req.file.filename, function(err) {
                    if ( err ){ 
                        console.log('ERROR MODIFICAR USUARIO: ' + err);
                    }else{
                        usuarioModelo.findByIdAndUpdate(idUsuario,
                            {
                            nombre:req.body.nombre,
                            correo:req.body.correo,
                            imagen:req.file.filename
                            }).exec().then((resultado:any)=>{
                                res.status(201).json({
                                    registroBD:resultado,
                                    reqBody:req.body,
                                    reqFiles:req.file
                                })
                                fs.unlink("./public/images/fotosPerfil/"+resultado.imagen,function(error){
                                    if(error){
                                        console.log("Hubo un error al eliminar la foto de perfil antigua");
                                        console.log(error);
                                    }
                                })
                        }).catch(error=>{
                            console.log("algo salió mal modificando al usuario");
                            console.log(error)
                        })
                    }          
                })
            }else{
                //El req.body.clave no será indefinido cuando se envíe una solicitud desde
                // el modificar Clave 
                if(req.body.clave){
                    const salt =  await bcrypt.genSalt();
                    const claveEncriptada = await bcrypt.hash(req.body.clave,salt)
                    usuarioModelo.findByIdAndUpdate(idUsuario,
                        {
                        nombre:req.body.nombre,
                        correo:req.body.correo,
                        clave:claveEncriptada
                        }).exec().then(resultado=>{
                            res.status(201).json({
                                registroBD:resultado,
                                reqBody:req.body,
                            })
                        }).catch(error=>{
                            console.log("Algo salió mal modificando al usuario");
                            console.log(error);
                        })
                }else{
                    usuarioModelo.findByIdAndUpdate(idUsuario,
                        {
                        nombre:req.body.nombre,
                        correo:req.body.correo
                        }).exec().then(resultado=>{
                            res.status(201).json({
                                registroBD:resultado,
                                reqBody:req.body,
                            })
                        }).catch(error=>{
                            console.log("Algo salió mal modificando al usuario");
                            console.log(error);
                        })
                }
            }
       }catch(error:any){
         res.status(500).json({
            error:error.toString()
         })
       }
    })
    router.post("/recuperarClave",upload.any(),(req:any,res)=>{
         modificarClave(req.body.correo,req.body.pregunta,req.body.respuesta)
        .then(resultado=>{
            res.status(201).json({
                resultado:resultado[0],
                usuario:resultado[1]
            })
        });

    })
    //Insertar
    router.post("/registro",upload.any(), async (req,res)=>{
        try{
            const salt =  await bcrypt.genSalt();
            const claveEncriptada = await bcrypt.hash(req.body.clave,salt)
            usuarioModelo.create({
                nombre:req.body.nombre,
                correo:req.body.correo,
                clave:claveEncriptada,
                pregunta:req.body.pregunta,
                fechaNacimiento:req.body.fecha,
                respuesta:req.body.respuesta,
                imagen:"",
                rol:"usuario"
            }).then((resultado:any)=>{
                console.log("Usuario creado !!!");
                console.log(resultado);
            }).catch(error=>{
                console.log("Algo salió mal");
                console.log(error);
            })
            res.status(201).json({
                insertaste:req.body
            })
        }catch(error:any){
            res.status(500).json({
                error:error.toString()
            })
        }

    })
    router.post("/insertarLike",upload.any(),(req:any,res:any)=>{
        likes.create({
            idPelicula:req.body.idPelicula,
            idUsuario:req.body.idUsuario,
            fecha:req.body.fecha
        }).then(resultado=>{
            res.status(201).json({
                insertaste:resultado,
                reqBody:req.body
            })
        }).catch(error=>{
            console.log(res.status())
            console.log("algo salió mal insertando el like");
            console.log(error);
        })

    })
    router.post("/insertarDislike",upload.any(),(req:any,res:any)=>{
      try{
        dislikes.create({
            idPelicula:req.body.idPelicula,
            idUsuario:req.body.idUsuario,
            fecha:req.body.fecha
        }).then(resultado=>{
            res.status(201).json({
                insertaste:resultado,
                reqBody:req.body
            })
        }).catch(error=>{
            console.log("Algo salió mal insertando dislikes");
            console.log(error.toString());console.log(res.status());
        })
      }catch(error:any){
        console.log("-----------")
        console.log("algo salió mal en el insertar dislike");
        console.log(error.toString())
        console.log("-----------")
        res.status(500).json({
            msj:"Error insertar dislike",
            error:error.toString()
        })
      }
    })
    router.post("/insertarComentario",upload.any(),(req:any,res:any)=>{
        try{
            if(req.body.idComentarioPrincipal == "" && req.body.nombreCreador == ""){
                comentariosModel.create({
                    descripcion:req.body.descripcion,
                    idPelicula:req.body.pelicula,
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
                    }
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
                comentariosModel.create({
                    descripcion:req.body.descripcion,
                    idPelicula:req.body.pelicula,
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
                    }
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
    //Eliminar
    router.post("/eliminarLike/:idPeli/:idUsuario",(req:any,res:any)=>{
    try{
        var idPeli = req.params.idPeli;
        var idUsuario = req.params.idUsuario;
        likes.findOneAndDelete({idPelicula:idPeli,idUsuario:idUsuario}).exec()
        .then(resultado=>{
            res.status(201).json({
                resultado:resultado
            })
        }).catch(error=>{
            console.log("Algo salió mal eliminando el like");
            console.log(error.toString());
            console.log(res.status());
        })
      }catch(error:any){
        console.log("Algo salió mal en eliminar like");
        console.log(error.toString());
        req.status(500).json({
            msj:"Algo salió mal en eliminar like",
            error:error.toString()
        })
      }
    })
    router.post("/eliminarDislike/:idPeli/:idUsuario",(req:any,res:any)=>{
        try{
            var idPeli = req.params.idPeli;
            var idUsuario = req.params.idUsuario;
            dislikes.findOneAndDelete({idPelicula:idPeli,idUsuario:idUsuario}).exec()
            .then(resultado=>{
                res.status(201).json({
                    resultado:resultado
                })
            }).catch(error=>{
                console.log("algo salió mal eliminando un dislike");
                console.log(error.toString());
            })
        }catch(error:any){
            console.log("-----------");
            console.log("algo salió mal eliminando un dislike");
            console.log(error.toString());
            console.log("-----------");
            res.status(500).json({
                msj:"Error insertar dislike",
                error:error.toString()
            })
        }
    })
    router.post("/eliminarPelicula/:idPelicula",async(req:any,res:any)=>{
        var idPelicula = req.params.idPelicula;var resultadoA:any
        await peliculaEjemplo.findByIdAndDelete(idPelicula).exec()
        .then((resultado:any)=>{
            resultadoA = resultado
            fs.unlink("./public/images/portadas/"+resultado.portada,function(err){
                if(err){
                    console.log(err)
                }
            })
           fs.unlink("./public/videos/"+resultado.pelicula,function(err){
                if(err){
                    console.log(err)
                }
            })
        })
        res.status(201).json({
            resultado:resultadoA
        })
    })


//Método GET
    router.get("/peliculas/:id",(req,res)=>{
        const idPelicula = req.params.id;
        var pelicula:any=[];var comentarios:any=[]
        peliculaEjemplo.findById(idPelicula).exec().then(async (resultado)=>{
            pelicula = resultado;
           await comentariosModel.find({idPelicula}).exec().then(respuesta=>{
                comentarios = respuesta; 
            })
            res.status(200).json({
                pelicula:pelicula,
                comentarios:comentarios
            })
            //console.log(req.headers)
        }).catch(error=>{
            console.log("Algo salió mal");
            console.log(error)
        })
    })

    router.get("/peliculas",async (req:any,res:any)=>{
        var peliculasPorEnviar:any = [];var meGusta:any=[];var noMeGusta:any=[];
        //console.log(req.headers["user-agent"].split(" "));
        await likes.find({}).exec().then(registrosMeGusta=>{
             meGusta = registrosMeGusta;
        })
        await dislikes.find({}).exec().then(registrosNoMeGusta=>{
            noMeGusta = registrosNoMeGusta
        })

        await peliculaEjemplo.find({}).exec().then((resultado:any)=>{
            for(let pelicula of resultado){
               var contadorLikes = 0;var contadorDislikes=0;
               for(let like of meGusta){
                 if(pelicula._id == like.idPelicula){
                      contadorLikes++
                 }
               }
               for(let dislike of noMeGusta){
                 if(pelicula._id == dislike.idPelicula){
                     contadorDislikes++
                 }
               }
               peliculasPorEnviar.push({
                pelicula,contadorLikes,contadorDislikes
               })
            }

        })
        res.status(200).json({
             message: "GET",
            lista:peliculasPorEnviar
            })
    })
    router.get("/verificarCorreo/:correo",(req,res)=>{
        var correo = req.params.correo;
        usuarioModelo.find({correo:correo}).exec()
        .then(resultado=>{
            res.status(200).json({
                coincidencias:resultado
            })
            console.log(resultado)
        })
    })
    router.get("/likes/:idPelicula",(req,res)=>{
      var idPelicula = req.params.idPelicula;
      var resultado = buscarDetallesPeliculas(idPelicula,res);
      resultado.then(datos=>{
          res.status(200).json({
              meGusta:datos[0],
              noMeGusta:datos[1]
          })
      })
    })
    router.get("/likesUsuario/:idUsuario",async (req,res)=>{
        var idUsuario = req.params.idUsuario;
        var peliculas = traerLikesDelUsuario(idUsuario,res);
        await peliculas.then((listaPelis:any)=>{
            res.status(200).json({
                listaPeliculas:listaPelis
            })
        }).catch(error=>{
            console.log("Algo salió mal en la promesa peliculas");
            console.log(error);
        })
    })

    router.get("/dislikesUsuario/:idUsuario",(req,res)=>{
        var idUsuario = req.params.idUsuario;
        var peliculas = traerDislikesDelUsuario(idUsuario,res);
        peliculas.then(listaPelis=>{
            res.status(200).json({
                listaPeliculas:listaPelis
            })
        }).catch(error=>{
            console.log("Algo salió mal en la promesa peliculas");
            console.log(error);
        })
    })
    router.get("/preguntas",(req,res)=>{

        preguntas.find({}).exec().then(resultado=>{
            res.status(200).json({
                preguntas:resultado,
            })
        }).catch(error=>{
            console.log("algo salió mal")
            console.log(error)
        })
    })

    router.get('/',(req,res,next)=>{
        leerDirectorio()
        res.status(200).json({
            message: "GET",
            lista:lista
        })
        lista =[]
    })

//Funciones utilizadas para el trabajo
    async function buscarDetallesPeliculas(idPeli:any,res:any){
        var meGusta,noMeGusta;
        await likes.find({idPelicula:idPeli}).exec()
        .then(resultado=>{
            meGusta = resultado 
        }).catch(error=>{
            console.log("algo salió mal buscando los likes");
            console.log(error);
        })
        //
        await dislikes.find({idPelicula:idPeli}).exec()
        .then(resultado=>{
            noMeGusta = resultado
        }).catch(error=>{
            console.log("Algo salió mal buscando dislikes");
            console.log(error);
            console.log(res.status());
        })
        return [meGusta,noMeGusta]
    }

    async function traerLikesDelUsuario(idUsuario:any,res:any){
        try{
          var likesUsuario:any;var listaPelicula:any=[];
          await likes.find({idUsuario:idUsuario}).exec()
            .then(resultado=>{
                  likesUsuario = resultado
            }).catch(error=>{
                console.log("Algo salió mal buscando likes del usuario");
                console.log(error);
            })
          for(let like of likesUsuario){
           await peliculaEjemplo.findById(like.idPelicula).exec()
            .then(resultado=>{
                listaPelicula.push({resultado,like:like.fecha})
            })
          }
          return listaPelicula
       }catch(error:any){
            console.log("-----------")
            console.log("algo salió mal en buscando likes del usuario");
            console.log(error.toString())
            console.log("-----------")
            res.status(500).json({
                msj:"algo salió mal en buscando likes del usuario",
                error:error.toString()
            })
        }
    }

    async function traerDislikesDelUsuario(idUsuario:any,res:any){
        try{
            var dislikesUsuario:any;var listaPelicula:any=[];
            await dislikes.find({idUsuario:idUsuario}).exec()
              .then(resultado=>{
                    dislikesUsuario = resultado
              }).catch(error=>{
                  console.log("Algo salió mal buscando likes del usuario");
                  console.log(error);
              })
            for(let dislike of dislikesUsuario){
             await peliculaEjemplo.findById(dislike.idPelicula).exec()
              .then(resultado=>{
                  listaPelicula.push({resultado,dislike:dislike.fecha})
              })
            }
            return listaPelicula
         }catch(error:any){
              console.log("-----------")
              console.log("algo salió mal en buscando likes del usuario");
              console.log(error.toString())
              console.log("-----------")
              res.status(500).json({
                  msj:"algo salió mal en buscando likes del usuario",
                  error:error.toString()
              })
          }
    }
    async function modificarClave(correo:any,idPregunta:any,respuesta:any){
        try{
            var datosUsuario:any;
            await usuarioModelo.findOne({correo:correo}).exec()
             .then(resultado=>{
              //console.log(resultado)
              datosUsuario = resultado
             })
             if(datosUsuario != null){
              if(datosUsuario.pregunta == idPregunta){
                  if(datosUsuario.respuesta == respuesta){
                    return [4,datosUsuario]
                  }else{
                      return [3,""]
                  }
               }else{
                  return [2,""]
               }
             }else{
              return [1,""]
             }
        }catch(error:any){
            return error.toString()
        }

    }
export default module.exports=router