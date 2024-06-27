import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;
import fs from 'fs';
const directoryPath = "./public/imagenes/"
//var MailComposer = require("nodemailer/lib/mail-composer");
const accountTransport = require("./account_transport.json");
import mailcomposer from "nodemailer/lib/mail-composer"
//Required package
var pdf = require("pdf-creator-node");
const URl ="http://10.155.86.66:8100/";
const xdr = "http://10.155.86.66:3000/"
var oauth2Client:any;
var gmail:any;
function iniciarCliente(){
     oauth2Client = new OAuth2(
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

    gmail = google.gmail({version: 'v1',auth: oauth2Client});
}

async function crearPdf(datos:any){

    var html = fs.readFileSync("./views/index.ejs","utf-8");
    var options ={
     format:"Letter",
     orientation:"landscape",
     border:"10mm"
    }
    var doc = {
     html:html,
     data:{
         h:datos,
         im:xdr+"creacion/imagenes/logo.png"
     },
     path:"./views/owo.pdf",
     type:"buffer"
    }
    //Creando el pdf
   return pdf.create(doc,options)
}
function prueba(){

           //Leyendo el template, formato al pdf (en options) y renderizando (en doc)
           var html = fs.readFileSync("./views/index.ejs","utf-8");
           var options ={
            format:"Letter",
            orientation:"landscape",
            border:"10mm"
           }
           var doc = {
            html:html,
            data:{
                h:"holauwu",
                im:xdr+"creacion/imagenes/logo.png"
            },
            path:"./views/owo.pdf",
            type:"buffer"
           }
           //Creando el pdf
           pdf.create(doc,options).then((res:any)=>{
           // console.log("nyaaa")
           // console.log(res);
            var mensa = "";
            var mes = new mailcomposer({
             from: "colinagym3@gmail.com",
             to:'vic.cabello@duocuc.cl',
             subject:"Nyaaaaa",
             text:"hola nekos como estamos xd",
             attachments:[{filename:"uwu.pdf",content:res.toString("base64"),encoding:"base64"}]
            })
            mes.compile().build((err:any,da:any)=>{
             if(err){
                 console.log(err);
             }else{
                 mensa = da
                 enviarCorreo(mensa); 
             }
            })
           }).catch((error:any)=>{console.log(error)})
           //

}
function enviarCorreo(detalle:any){
    var mail = {}
    if(detalle.multi){
        mail = {
            from: "colinagym3@gmail.com",
            to: detalle.correo,
            subject: detalle.asunto,
            html: detalle.cuerpo,
            attachments: detalle.multi
        }
    }else{
        mail = {
            from: "colinagym3@gmail.com",
            to: detalle.correo,
            subject: detalle.asunto,
            html: detalle.cuerpo,
        }
    }
    var mes = new mailcomposer(mail)
    mes.compile().build((err:any,da:any)=>{
     if(err){
         console.log(err);
     }else{
         const base64Email = Buffer.from(da).toString('base64');
         gmail.users.messages.send({
            userId:"colinagym3@gmail.com",
            requestBody:{
                raw:base64Email
            }
          })
       }
    })

}
function enviarCodigoSeguridad(codigoSeguridad:string,correoU:string,rut:any,flag:string){
    if(flag=="true"){
          var detalle={
            correo:correoU,
            asunto:" Código de seguridad",
            cuerpo:'Bienvenido al gimnasio de Colina, para finalizar con tu registro debes ingresar el código de seguridad '+
            'en la aplicación. Cuando se verifique su identidad, podrás acceder a la App con tu correo electrónico o '+
            'con una clave de acceso que se te enviará al correo.<br><br> '+
            'Presiona el siguiente link para redirigirlo a la parte final de su registro<br> '+
            URl+'/confirmar-registro/'+rut
            +'<br> Tú código de seguridad es: <b>'+codigoSeguridad+'</b>'
          }
          enviarCorreo(detalle);

    }else{

          var detalle={
            correo:correoU,
            asunto:" Código de seguridad",
            cuerpo: 'Bienvenido al gimnasio de Colina, para finalizar con tu registro debes ingresar el código de seguridad '+
            'en la aplicación. Cuando se verifique su identidad, podrás acceder a la App con tu correo electrónico o '+
            'con una clave de acceso que se te enviará al correo.'
            +'<br><br> Tú código de seguridad es: <b>'+codigoSeguridad+"</b>"
          }
          enviarCorreo(detalle);
    }
    
    
}

function enviarCodigoAcceso(codigoAcceso:any,correoUser:any,user:any){
      var detalle={
        correo:correoUser,
        asunto:"Código de acceso al gimnasio",
        cuerpo:'Hola '+user.nombre+" "+user.apellido+'. Haz completado exitosamente tu registro en la App de colina gym. Puedes acceder a la aplicación '+
        'mediante el siguiente código de acceso o con tu correo electrónico.<br><br>Tu código de acceso es el: <b>'+
         codigoAcceso+'</b>'
      }
    
      enviarCorreo(detalle);
}

function respuestSolicitud(correoUser:any,user:any,respuesta:any,asunto:any){
    const emailLines = [
        'From: colinagym3@gmail.com',
        'To: '+correoUser,
        'Content-type: text/html;charset=iso-8859-1',
        'MIME-Version: 1.0',
        'Subject: Respuesta a la solicitud: '+ asunto,
        '',
        'Hola '+user+ ", " + respuesta
      ];
    
      enviarCorreo(emailLines);
}

function recuperarCodigo(correoUser:any,codigo:any){

      var detalle={
        correo:correoUser,
        asunto:" Solicitud de cambio de clave de acceso",
        cuerpo:'Hola, solicitaste recuperar tu código. Tu nuevo código de acceso es: <b>' + codigo+'</b>'
      }
    
      enviarCorreo(detalle);
}

function adverComentario(correoUser:any,numWarning:any,comentario:any){
    const emailLines = [
        'From: colinagym3@gmail.com',
        'To: '+correoUser,
        'Content-type: text/html;charset=iso-8859-1',
        'MIME-Version: 1.0',
        'Subject: Advertencia de comentario inapropiado',
        '',
        'Hola, infringiste las normas de convivencia del gimnasio por medio de tu comentario: ' + '"'+comentario+'"'+
        ' ,por lo que se te advierte que si repites este comportamiento '+numWarning+' veces más, no podrás realizar '+
        'comentarios a las noticias que se publiquen en un futuro.'
      ];
    
      enviarCorreo(emailLines);
}

function banearUser(correoUser:any){
    const emailLines = [
        'From: colinagym3@gmail.com',
        'To: '+correoUser,
        'Content-type: text/html;charset=iso-8859-1',
        'MIME-Version: 1.0',
        'Subject: Advertencia de comentario inapropiado',
        '',
        'Has sido sancionado permanentemente de la sección de comentarios dentro de las noticias, después de '+
        '3 oportunidades, no hubo cambio en tu comportamiento por lo que, tendrás restringido comentar las noticias.'
      ];
    
      enviarCorreo(emailLines);
}

function notificarPago(correoUser:any,trans:any){ 
     let fecha = trans.fechaPago.toLocaleString("es-ES",{month:"long",year:"numeric",day:"numeric",weekday:"long"})
      var cont={
        ordenCompra:trans.ordenCompra,
        usuario:trans.usuario,
        fechaPago:fecha,
        monto:trans.monto.toLocaleString("es"),
        tipoPago:trans.tipoPago,
        estado:trans.estado
      }
      crearPdf(cont).then((res:any)=>{
        var detalle = {
            correo:correoUser,
            asunto:"Notifiación de pago de mensualidad",
            cuerpo:"En el archivo adjunto está el comprobante de su transacción",
            multi:[{filename:"comprobanteColinaGym.pdf",content:res.toString("base64"),encoding:"base64"}]
          }
         enviarCorreo(detalle);
      }).catch((error:any)=>{
        console.log("Error creando el pdf")
        console.log(error)
      })
    
}
export default module.exports = {iniciarCliente,enviarCodigoSeguridad,enviarCodigoAcceso,respuestSolicitud,
    recuperarCodigo,adverComentario,banearUser,notificarPago,prueba}