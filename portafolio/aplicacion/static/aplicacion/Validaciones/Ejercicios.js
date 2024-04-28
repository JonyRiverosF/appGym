//Creacion de la noticia 
$(document).ready(function(){

    var apiUrl = "http://192.168.1.2:3000";

    $("#fotoE").change(function(e){
        foto = e.target.files[0]
        var preview = URL.createObjectURL(foto) 
        $("#portada").html("<img src="+preview+" style='width:200px;height:200px;' >")
        console.log(foto)
    });

    $("#videoE").change(function(e){
        video = e.target.files[0]
        var previe = URL.createObjectURL(video) 
        $("#uwu").html("<video src="+previe+" width='300px' height='300px' controls></video>")
        console.log(video)
    });
    
    //Creacion de los Ejercicios
    $("#FormEjercicios").submit(function(e){
        //e.preventDefault();

        var nombreEjercicio = $("#nombreE").val();
        var tipoMusculo = $("#RolMusc").val();
        var tipoMaquina =  $("#RolMaq").val();
        
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
            var formulario = new FormData();
                formulario.append("Titulo", nombreEjercicio);
                formulario.append("video", video);
                formulario.append("video", foto);
                formulario.append("tipoMusculo", tipoMusculo);
                formulario.append("tipoMaquina", tipoMaquina);

            fetch(apiUrl + "/creacion/CrearEjercicio", {
                method: "POST",
                body: formulario
            }).then(res => {
                console.log(res);
                msjMostrar += "Ejercicio Registrado Correctamente."   
            });
            $("#mensaje_CrearEjercicio").html("-Ejercicio Creado Correctamente.");
        }
    });








    


    //Modificacion de los Ejercicios
    $("#FormModificarEjercicios").submit(function(e){    
        var nombreEjercicio = $("#nombreE").val();
        var idE = $("#idE").val();
        
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
