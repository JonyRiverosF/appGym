$(document).ready(function(){
    //Creacion de las Dietas
    $("#FormDietas").submit(function(e){
        var nombreDieta = $("#nombreD").val();

        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Dieta
        if(nombreDieta.trim() == ""){
            msjMostrar += "<br>-El nombre de la dieta no puede estar vacío.";
            enviar = true;
        }

        if (/\d/.test(nombreDieta)){
            msjMostrar += "<br>-Nombre de dieta inválido, no puede contener números.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(nombreDieta)){
            msjMostrar += "<br>-Nombre inválido, no debe contener caracteres especiales.";
            enviar = true;
        }

        if(enviar){
            $("#mensaje_CrearDieta").html(msjMostrar);
            e.preventDefault();
        }
        else{
            $("#mensaje_CrearDieta").html("-Dieta Creada Correctamente.");
        }
    });






    //Modificacion de las Dietas
    $("#FormModificarDieta").submit(function(e){
        var nombreDieta = $("#nombreD").val();

        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Dieta
        if(nombreDieta.trim() == ""){
            msjMostrar += "<br>-El nombre de la dieta no puede estar vacío.";
            enviar = true;
        }

        if (/\d/.test(nombreDieta)){
            msjMostrar += "<br>-Nombre de dieta inválido, no puede contener números.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(nombreDieta)){
            msjMostrar += "<br>-Nombre inválido, no debe contener caracteres especiales.";
            enviar = true;
        }

        if(enviar){
            $("#mensaje_ModificarDieta").html(msjMostrar);
            e.preventDefault();
        }
        else{
            $("#mensaje_ModificarDieta").html("-Dieta Modificada Correctamente.");
        }
    });
});