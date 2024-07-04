import express, { Request, Response } from "express";
const router = express.Router()
import multer from 'multer';
const upload = multer({ dest: 'public/videos/' })
import mongoose, { Mongoose } from "mongoose";
import fs from 'fs';
import bcrypt from 'bcrypt';
import wspClient from "./complementos/wsp";
import modelos from "./modelos"
import correos from "./complementos/correos";

var usuarioModelo = modelos.usuarioModelo
var horariosElegidosModelo = modelos.horariosElegidosModelo
var url="http://10.155.87.206:"

//


import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'; // ES6 Modules

import { WebpayPlus } from 'transbank-sdk'; // ES6 Modules
import { convertToObject } from "typescript";
//

var usuarioPago:any;
correos.iniciarCliente()
mongoose.connect("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")
.then(res=>{
    console.log("Conectado validaciones ts")
    //correos.prueba()
}).catch(err=>{
    console.log("Algo salió mal");
    console.log(err);
})

router.get("/",(req:Request,res:Response)=>{
    //correos.prueba()
    res.render("index.ejs",{h:"hola"})
})

router.post('/subscribe', upload.any(),async (req:Request, res:Response) => {
    const tx = new WebpayPlus.Transaction(new Options("597055555532", "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C", "https://webpay3gint.transbank.cl/"));
    const response = await tx.create(
     "1223456", "1234", 14500, url+ "3000/validaciones/nya"
   ).then(resi=>{
  //  console.log(resi)
            res.json({resi})
        
   })
});

router.post("/solicitarPago/:id",(req:Request,res:Response)=>{
    var id = req.params.id;
    modelos.usuarioModelo.findById(id).exec().then(resp=>{
        usuarioPago = resp
        correos.linkPago(resp)
        res.status(200).json(resp)
    })    
})
/*router.post('/estadoTr', upload.any(),async (req:Request, res:Response) => {
    const tx = new WebpayPlus.Transaction(new Options("597055555532", "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C", "https://webpay3gint.transbank.cl/"));
    const response = await tx.status(req.body.tok).then(resi=>{
    console.log(resi)
    res.json(resi);
   })
});*/

var tok:any;
router.get("/nya",upload.any(),(req:Request,res:Response)=>{
   console.log("--------")
    console.log(req.query)
    console.log("--------") 
    const xd = new WebpayPlus.Transaction(new Options("597055555532","579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C","https://webpay3gint.transbank.cl/"))
    if(req.query.token_ws){
        xd.commit(String(req.query.token_ws)).then(respuesta=>{
            tok = {respuesta,token:req.query.token_ws}

          //  console.log(respuesta)
            res.redirect(url+ "8100/pago-listo")
        });
    }else{
        //Aquí entra cuando se anula la compra
        const awa = xd.status(String(req.query.TBK_TOKEN)).then(respuesta=>{
            tok = {respuesta}
          //  console.log(respuesta)
            res.redirect(url+ "8100/pago-listo")
        });
    }
    // /rswebpaytransaction/api/webpay/v1.2/transactions/{token}
})



router.post("/pagoListo",upload.any(),(req:Request,res:Response)=>{
    if(!tok.token){
        let respuesta = tok
        res.status(200).json({tok:respuesta});
    }else{

        const tipoPago = formatoTarjeta(tok);
        const estado = formatoEstado(tok)
        modelos.modeloTrans.create({
            rut:usuarioPago.rut,
            usuario:usuarioPago.nombre+" "+usuarioPago.apellido,
            ordenCompra:tok.respuesta.buy_order,
            idSesion:tok.respuesta.session_id,
            fechaPago:tok.respuesta.transaction_date,
            tipoPago:tipoPago,
            estado:estado,
            monto:tok.respuesta.amount,
            nroCard:tok.respuesta.card_detail.card_number

        }).then(resp=>{
            modelos.usuarioModelo.findOneAndUpdate({rut:usuarioPago.rut},{pago:true}).exec().then((respuesta:any)=>{
                correos.notificarPago(respuesta?.correo,resp)
                if(resp.estado == "Pago exitoso"){
                    respuesta.pago = true;
                }
                res.status(200).json({tok,respuesta});
            }).catch(error=>{
                console.log("Algo salió mal en pago listo en modelousuario");
                console.log(error);
                res.status(500).json(error)
            })
        }).catch(error=>{
            console.log("Algo salió mal creando una transacción en mongo");
            console.log(error);
            res.status(500).json(error)
        })
    }
})

router.post("/CerrarGym/:id" ,  (req:Request, res:Response)=>{
    var id=req.params.id;

    modelos.checkInModelo.findByIdAndUpdate(id,{
        estado:"inactivo",

    }).exec().then(respuesta => {
        res.status(201).json(respuesta);

    }).catch(error => {
        console.log("Error al actualizar el estado del checkin");
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar el estado del checkin" });
    });
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
    var fechaHoy = new Date();
    var hor = fechaHoy.getHours();var porEnviar:any = [];var horasPorEnviar:any=[]
    var diaSemana; //almacena el dia de la semana del día actual
    modelos.horariosModelo.find({vigencia:true}).then((respuesta:any)=>{
       // console.log(fechaHoy.getDay())
        for(let x of respuesta){
           diaSemana  = new Date(x.fecha);
            if(diaSemana.getDay() == fechaHoy.getDay()){
                for(let hora of x.horas){
                  var horas = hora.hora.split("-")[0];
                  if(Number(horas.split(":")[0]) > hor){
                   //  console.log(Number(horas.split(":")[0]))
                     horasPorEnviar.push(hora)
                  }else{
                    if(hor >= 22){
                        horasPorEnviar.push(hora)
                    }
                  }
                }
                porEnviar.push({id:x._id,fecha:x.fecha,horas:horasPorEnviar}) 
                horasPorEnviar=[]
            }else{
                porEnviar.push({id:x._id,fecha:x.fecha,horas:x.horas}) 
                horasPorEnviar=[]
            }
          }
        if(porEnviar.length > 0){
            res.status(200).json({
                respuesta:porEnviar,
                xd:respuesta
            })
        }else{
            res.status(200).json({
                respuesta:"Nada que mostrar"
            })
        }
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

router.post("/recuperarCodigo",upload.any(),(req:Request,res:Response)=>{
    var contador=0;var codigo = "";
    var codigoSeguridad="";
    while(contador < 4){
       codigo += String(Math.floor(Math.random()*10))
       contador++;
    }
    modelos.usuarioModelo.findOneAndUpdate({correo:req.body.correo},{
        codigo
    }).exec().then(respuesta=>{
        console.log(respuesta)
        correos.recuperarCodigo(req.body.correo,codigo)
        res.status(201).json(respuesta)
    })

})

function formatoTarjeta(x:any){
    switch(x.respuesta.payment_type_code){
      case "VD":
        x.respuesta.payment_type_code = "DÉBITO";break;
      case "VP":
        x.respuesta.payment_type_code = "PREPAGO";break;
      case "VN":
        x.respuesta.payment_type_code = "CRËDITO SIN CUOTAS";break;
    }
    return x.respuesta.payment_type_code
  }

function formatoEstado(x:any){
    switch(x.respuesta.status){
      case "AUTHORIZED":
        x.respuesta.status = "Pago exitoso";break;
      case "FAILED":
        x.respuesta.status = "Pago rechazado";break;
    }
    return x.respuesta.status
  }
export default module.exports=router