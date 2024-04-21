$(document).ready(function(){
    //Creacion de la noticia
    $("#FormNoticias").submit(function(e){

        var nombreNoticia = $("#tituloN").val();
        var bajadaNoticia = $("#bajadaN").val();
        var desNoticia = $("#descN").val();
        
        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Noticia
        if(nombreNoticia.trim() == ""){
            msjMostrar += "<br>-El nombre de la noticia no puede estar vacío.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(nombreNoticia)){
            msjMostrar += "<br>-Nombre de la noticia inválido, no debe contener caracteres especiales.";
            enviar = true;
        }

        // Validar Bajada De Noticia
        if(bajadaNoticia.trim() == ""){
            msjMostrar += "<br>-El nombre de la bajada de noticia no puede estar vacío.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(bajadaNoticia)){
            msjMostrar += "<br>-Nombre de la bajada de noticia inválido, no debe contener caracteres especiales.";
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
            $("#mensaje_CrearNoticia").html("-Noticia Creada Correctamente.");
        }
    });

    //Modificacion de la noticia
    $("#FormModificarNoticia").submit(function(e){

        var nombreNoticia = $("#tituloN").val();
        var bajadaNoticia = $("#bajadaN").val();
        var desNoticia = $("#descN").val();
        
        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Noticia
        if(nombreNoticia.trim() == ""){
            msjMostrar += "<br>-El nombre de la noticia no puede estar vacío.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(nombreNoticia)){
            msjMostrar += "<br>-Nombre de la noticia inválido, no debe contener caracteres especiales.";
            enviar = true;
        }

        // Validar Bajada De Noticia
        if(bajadaNoticia.trim() == ""){
            msjMostrar += "<br>-El nombre de la bajada de noticia no puede estar vacío.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(bajadaNoticia)){
            msjMostrar += "<br>-Nombre de la bajada de noticia inválido, no debe contener caracteres especiales.";
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
            $("#mensaje_ModificarNoticia").html("-Noticia Creada Correctamente.");
        }
    });
});