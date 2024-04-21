//Creacion de la noticia 
$(document).ready(function(){
    //Creacion de los Ejercicios
    $("#FormEjercicios").submit(function(e){

        var nombreEjercicio = $("#nombreE").val();
        
        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Ejercicio
        if(nombreEjercicio.trim() == ""){
            msjMostrar += "<br>-El nombre del ejercicio no puede estar vacío.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(nombreEjercicio)){
            msjMostrar += "<br>-Nombre del ejercicio inválido, no debe contener caracteres especiales.";
            enviar = true;
        }

        if(enviar){
            $("#mensaje_CrearEjercicio").html(msjMostrar);
            e.preventDefault();
        }
        else{
            $("#mensaje_CrearEjercicio").html("-Ejercicio Creado Correctamente.");
        }
    });




    //Modificacion de los Ejercicios
    $("#FormModificarEjercicios").submit(function(e){    
        var nombreEjercicio = $("#nombreE").val();
        
        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Ejercicio
        if(nombreEjercicio.trim() == ""){
            msjMostrar += "<br>-El nombre del ejercicio no puede estar vacío.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(nombreEjercicio)){
            msjMostrar += "<br>-Nombre del ejercicio inválido, no debe contener caracteres especiales.";
            enviar = true;
        }

        if(enviar){
            $("#mensaje_ModificarEjercicio").html(msjMostrar);
            e.preventDefault();
        }
        else{
            $("#mensaje_ModificarEjercicio").html("-Ejercicio Modificado Correctamente.");
        }
    });
});
