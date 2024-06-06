const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const accountTransport = require("./account_transport.json");


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

function enviarCodigoSeguridad(codigoSeguridad:string,correoU:string,rut:any,flag:string){
    if(flag=="true"){
        const emailLines = [
            'From: colinagym3@gmail.com',
            'To: '+correoU,
            'Content-type: text/html;charset=iso-8859-1',
            'MIME-Version: 1.0',
            'Subject: Codigo de seguridad',
            '',
            'Bienvenido al gimnasio de Colina, para finalizar con tu registro debes ingresar el código de seguridad '+
            'en la aplicación. Cuando se verifique su identidad, podrás acceder a la App con tu correo electrónico o '+
            'con una clave de acceso que se te enviará al correo. '+
            'Presiona el siguiente link para redirigirlo a la parte final de su registro '+
            'http://10.155.86.66:8100/confirmar-registro/'+rut
            +' Tú código de seguridad es: '+codigoSeguridad
          ];
          const email = emailLines.join('\r\n').trim();
          const base64Email = Buffer.from(email).toString('base64');
          gmail.users.messages.send({
             userId:"colinagym3@gmail.com",
             requestBody:{
                 raw:base64Email
             }
           })
    }else{
        const emailLines = [
            'From: colinagym3@gmail.com',
            'To: '+correoU,
            'Content-type: text/html;charset=iso-8859-1',
            'MIME-Version: 1.0',
            'Subject: Codigo de seguridad',
            '',
            'Bienvenido al gimnasio de Colina, para finalizar con tu registro debes ingresar el código de seguridad '+
            'en la aplicación. Cuando se verifique su identidad, podrás acceder a la App con tu correo electrónico o '+
            'con una clave de acceso que se te enviará al correo.'
            +' Tú código de seguridad es: '+codigoSeguridad
          ];
          const email = emailLines.join('\r\n').trim();
          const base64Email = Buffer.from(email).toString('base64');
          gmail.users.messages.send({
             userId:"colinagym3@gmail.com",
             requestBody:{
                 raw:base64Email
             }
           })
    }
    
    
}

function enviarCodigoAcceso(codigoAcceso:any,correoUser:any,user:any){
    const emailLines = [
        'From: colinagym3@gmail.com',
        'To: '+correoUser,
        'Content-type: text/html;charset=iso-8859-1',
        'MIME-Version: 1.0',
        'Subject: Codigo de acceso al gimnasio',
        '',
        'Hola '+user.nombre+" "+user.apellido+'. Haz completado exitosamente tu registro en la App de colina gym. Puedes acceder a la aplicación '+
        'mediante el siguiente código de acceso o con tu correo electrónico. Tu código de acceso es el: '+
         codigoAcceso
      ];
    
      const email = emailLines.join('\r\n').trim();
      const base64Email = Buffer.from(email).toString('base64');
    
     gmail.users.messages.send({
        userId:"colinagym3@gmail.com",
        requestBody:{
            raw:base64Email
        }
      })
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
    
      const email = emailLines.join('\r\n').trim();
      const base64Email = Buffer.from(email).toString('base64');
    
     gmail.users.messages.send({
        userId:"colinagym3@gmail.com",
        requestBody:{
            raw:base64Email
        }
      })
}

function recuperarCodigo(correoUser:any,codigo:any){
    const emailLines = [
        'From: colinagym3@gmail.com',
        'To: '+correoUser,
        'Content-type: text/html;charset=iso-8859-1',
        'MIME-Version: 1.0',
        'Subject: Solicitud de cambio de clave de acceso',
        '',
        'Hola, solicitaste recuperar tu código. Tu nuevo código de acceso es: ' + codigo
      ];
    
      const email = emailLines.join('\r\n').trim();
      const base64Email = Buffer.from(email).toString('base64');
    
     gmail.users.messages.send({
        userId:"colinagym3@gmail.com",
        requestBody:{
            raw:base64Email
        }
      })
}

function adverComentario(correoUser:any,codigo:any){
    const emailLines = [
        'From: colinagym3@gmail.com',
        'To: '+correoUser,
        'Content-type: text/html;charset=iso-8859-1',
        'MIME-Version: 1.0',
        'Subject: Advertencia de comentario inapropiado',
        '',
        'Hola, infringiste las normas del gimnasio con tu comentario: ' + codigo
      ];
    
      const email = emailLines.join('\r\n').trim();
      const base64Email = Buffer.from(email).toString('base64');
    
     gmail.users.messages.send({
        userId:"colinagym3@gmail.com",
        requestBody:{
            raw:base64Email
        }
      })
}

export default module.exports = {iniciarCliente,enviarCodigoSeguridad,enviarCodigoAcceso,respuestSolicitud,recuperarCodigo}