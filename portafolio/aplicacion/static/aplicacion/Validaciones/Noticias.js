$(document).ready(function(){

    var apiUrl = "http://192.168.100.232:3000";


    $("#fotoN").change(function(e){
        fotoN = e.target.files[0]
        var preview = URL.createObjectURL(fotoN) 
        $("#ftN").html("<p style='text-align: center;'><img src="+preview+" style='width:200px;height:200px;' ></p>")
        console.log(fotoN)
    });

    $("#videoN").change(function(e){
        videoN = e.target.files[0]
        var previe = URL.createObjectURL(videoN) 
        $("#vdN").html("<video src="+previe+" width='300px' height='300px' controls></video>")
        console.log(videoN)
    });

    //Creacion de la noticia
    $("#FormNoticias").submit(function(e){

        var nombreNoticia = $("#tituloN").val();
        var bajadaNoticia = $("#bajadaN").val();
        var desNoticia = $("#descN").val();
        
        let fecha = new Date();
        let ordenado = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        let fechaString = fecha.toLocaleDateString('es-ES', ordenado);
        console.log(fechaString);
        
        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Noticia
        if(nombreNoticia.trim() == ""){
            msjMostrar += "<br>-El nombre de la noticia no puede estar vacío.";
            enviar = true;
        }


        // Validar Bajada De Noticia
        if(bajadaNoticia.trim() == ""){
            msjMostrar += "<br>-El nombre de la bajada de noticia no puede estar vacío.";
            enviar = true;
        }


        // Validar Cuerpo de la Noticia
        if(desNoticia.trim() == ""){
            msjMostrar += "<br>-El nombre del cuerpo de la noticia no puede estar vacío.";
            enviar = true;
        }

        if(enviar){
            $("#mensaje_CrearNoticia").html(msjMostrar);
            e.preventDefault();
        }
        else{

            var formulario = new FormData();
                formulario.append("tituloN", nombreNoticia);
                formulario.append("bajadaN", bajadaNoticia);
                formulario.append("descN", desNoticia);
                formulario.append("fechaC", fechaString);
                formulario.append("video", videoN);
                formulario.append("video", fotoN);
                
            fetch(apiUrl + "/creacion/CrearNoticia", {
                method: "POST",
                body: formulario
            }).then(res => {
                console.log(res);
                msjMostrar += "Noticia Registrada Correctamente."   
            });
            $("#mensaje_CrearNoticia").html("-Noticia Creada Correctamente.");
        }
    });























    



        var fotoNM
    $("#fotoNM").change(function(e){
        fotoNM = e.target.files[0]
        var preview = URL.createObjectURL(fotoNM) 
        $("#fotoNoM")[0].src=preview
        $("#labelN")[0].innerHTML="Nueva foto de la noticia"
    });


        var videoNM
    $("#videoNM").change(function(e){
        videoNM = e.target.files[0]
        var preview = URL.createObjectURL(videoNM) 
        $("#labelMN")[0].innerHTML="Nuevo video de la noticia"
        $("#videoNoM")[0].src=preview
    });


    //Modificacion de la noticia
    $("#FormModificarNoticia").submit(function(e){
        e.preventDefault();  
        var nombreNoticia = $("#tituloN").val();
        var bajadaNoticia = $("#bajadaN").val();
        var desNoticia = $("#descN").val();
        var idNoticia = $("#idN")[0].innerHTML;
        console.log(idNoticia)

        let fechaM = new Date();
        let ordenado = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        let fechaNM = fechaM.toLocaleDateString('es-ES', ordenado);
        
        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Noticia
        if(nombreNoticia.trim() == ""){
            msjMostrar += "<br>-El nombre de la noticia no puede estar vacío.";
            enviar = true;
        }

        // Validar Bajada De Noticia
        if(bajadaNoticia.trim() == ""){
            msjMostrar += "<br>-El nombre de la bajada de noticia no puede estar vacío.";
            enviar = true;
        }


        // Validar Cuerpo de la Noticia
        if(desNoticia.trim() == ""){
            msjMostrar += "<br>-El nombre del cuerpo de la noticia no puede estar vacío.";
            enviar = true;
        }

        if(enviar){
            $("#mensaje_ModificarNoticia").html(msjMostrar);
            e.preventDefault();
        }
        else{
            var formulario = new FormData();
            formulario.append("tituloN", nombreNoticia);
            formulario.append("bajadaN", bajadaNoticia);
            formulario.append("fechaC", fechaNM);
            formulario.append("descN", desNoticia);

            if(videoNM){
                formulario.append("video", videoNM);
            }
            
            if(fotoNM){
                formulario.append("video", fotoNM);
            }
            
            

        fetch( apiUrl + '/modificar/modificarNoticia/'+ idNoticia, {
            method: 'PUT',
            body: formulario
        }).then(respuesta=>{
            respuesta.json()

        }).then(respuesta=>{
            $("#mensaje_ModificarNoticia").html("-Noticia Actualizada Correctamente.");
            console.log(respuesta);
        })  
        }


    });












    $("#FormRecuperarCodigo").submit(function(e){
        e.preventDefault();  
        var CorreoRecu = $("#CorreoRecu").val();
        
        let msjMostrar = "";
        let enviar = false;
        

        if(enviar){
            $("#mensaje_RecuperarCodigo").html(msjMostrar);
            e.preventDefault();
        }
        else{
            var formulario = new FormData();
            formulario.append("tituloN", CorreoRecu);

        fetch( apiUrl + '/modificar/modificarNoticia/' , {
            method: 'PUT',
            body: formulario
        }).then(respuesta=>{
            respuesta.json()

        }).then(respuesta=>{
            $("#mensaje_RecuperarCodigo").html("-Código Enviado a su correo.");
            console.log(respuesta);
        })  
        }


    });

});