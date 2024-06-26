//Creacion de la noticia 
$(document).ready(function(){
    
    var apiUrl = "http://192.168.1.2:3000";

    $("#fotoE").change(function(e){
        foto = e.target.files[0]
        var preview = URL.createObjectURL(foto) 
        $("#portada").html("<p style='text-align: center;'><img src="+preview+" style='width:200px;height:200px;' ></p>")
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
        var fichaEjercicio = $("#fichaE").val();
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
                formulario.append("ficha", fichaEjercicio);
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


















    $("#fotoMusc").change(function(e){
        fotoM = e.target.files[0]
        var preview = URL.createObjectURL(fotoM) 
        $("#musculoF").html("<p style='text-align: center;'><img src="+preview+" style='width:200px; height:200px;' ></p>")
        console.log(fotoM)
    });


    //Creacion de los musculos
    $("#FormMusculos").submit(function(e){
        var nombreMusculo = $("#nombreMusc").val();
        var fichaMusculo = $("#fichaMusc").val();

        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Dieta
        if(nombreMusculo.trim() == ""){
            msjMostrar += "<br>-El nombre de la dieta no puede estar vacío.";
            enviar = true;
        }

        if (/\d/.test(nombreMusculo)){
            msjMostrar += "<br>-Nombre de dieta inválido, no puede contener números.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(nombreMusculo)){
            msjMostrar += "<br>-Nombre inválido, no debe contener caracteres especiales.";
            enviar = true;
        }

        if(enviar){
            $("#mensaje_CrearMusculo").html(msjMostrar);
            e.preventDefault();
        }
        else{

            var formulario = new FormData();
                formulario.append("nombre", nombreMusculo);
                formulario.append("ficha", fichaMusculo);
                formulario.append("foto", fotoM);

            fetch(apiUrl + "/creacion/CrearMusculo", {
                method: "POST",
                body: formulario
            }).then(res => {
                console.log(res);
                msjMostrar += "Musculo Registrado Correctamente."   
            });
            $("#mensaje_CrearMusculo").html("-Dieta Creada Correctamente.");
        }
    });







        var fotoMM
    $("#fotoD").change(function(e){
        fotoMM = e.target.files[0]
        var preview = URL.createObjectURL(fotoMM) 
        $("#modiV")[0].src=preview
        $("#ModiL")[0].innerHTML="Nueva foto del grupo muscular"
    });

    
    //Modificacion de los Musculos
    $("#FormModificarMusculos").submit(function(e){
        e.preventDefault();    
        var nombreEjercicio = $("#nombreD").val();
        var idM = $("#idM")[0].innerHTML;
        var FichaM = $("#fichaMuscM").val();
        
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
            $("#mensaje_ModificarMusculo").html(msjMostrar);
            e.preventDefault();
        }
        else{
            var formulario = new FormData();
                    formulario.append("nombre", nombreEjercicio);

                    if(fotoMM){
                        formulario.append("foto", fotoMM);
                    }
                    
                    formulario.append("ficha", FichaM);

                fetch( apiUrl + '/modificar/modificarMusculo/'+ idM, {
                    method: 'PUT',
                    body: formulario
                }).then(respuesta=>{
                    respuesta.json()

                }).then(respuesta=>{
                    $("#mensaje_ModificarMusculo").html("-Ejercicio Modificado Correctamente.");
                    console.log(respuesta)
                })  
            



        }
    });





















$("#fotoMaqui").change(function(e){
        fotoMa = e.target.files[0]
        var preview = URL.createObjectURL(fotoMa) 
        $("#maquinaF").html("<p style='text-align: center;'><img src="+preview+" style='width:200px;height:200px;' ></p>")
        console.log(fotoMa)
    });


        //Creacion de las maquinas
    $("#FormMaquinas").submit(function(e){
        var nombreMaquina = $("#nombreMaqui").val();
        var fichaMaquina = $("#fichaMA").val();

        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Dieta
        if(nombreMaquina.trim() == ""){
            msjMostrar += "<br>-El nombre de la dieta no puede estar vacío.";
            enviar = true;
        }

        if (/\d/.test(nombreMaquina)){
            msjMostrar += "<br>-Nombre de dieta inválido, no puede contener números.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(nombreMaquina)){
            msjMostrar += "<br>-Nombre inválido, no debe contener caracteres especiales.";
            enviar = true;
        }

        if(enviar){
            $("#mensaje_CrearMaquina").html(msjMostrar);
            e.preventDefault();
        }
        else{
            var formulario = new FormData();
                formulario.append("nombre", nombreMaquina);
                formulario.append("ficha", fichaMaquina);
                formulario.append("foto", fotoMa);

            fetch(apiUrl + "/creacion/CrearMaquina", {
                method: "POST",
                body: formulario
            }).then(res => {
                console.log(res);
                msjMostrar += "Maquina Registrado Correctamente."   
            });
            $("#mensaje_CrearMaquina").html("-Maquina Creada Correctamente.");
        }
    });




    

        var fotoMM
    $("#fotoMM").change(function(e){
        fotoMM = e.target.files[0]
        var preview = URL.createObjectURL(fotoMM) 
        $("#fotoMMo")[0].src=preview
        $("#labelMM")[0].innerHTML="Nueva foto de la maquina"
    });


    //Modificacion de las maquinas
    $("#FormModificarMaquinas").submit(function(e){  
        e.preventDefault();  
        var nombreEjercicio = $("#nombreMM").val();
        var idM = $("#idMM")[0].innerHTML;
        var fichaM = $("#fichaMM").val();
        
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
            $("#mensaje_ModificarMaquina").html(msjMostrar);
            e.preventDefault();
        }
        else{

            var formulario = new FormData();
            formulario.append("nombre", nombreEjercicio);

            if(fotoMM){
                formulario.append("foto", fotoMM);
            }
            
            formulario.append("ficha", fichaM);
            
            

        fetch( apiUrl + '/modificar/modificarMaquina/'+ idM, {
            method: 'PUT',
            body: formulario
        }).then(respuesta=>{
            respuesta.json()

        }).then(respuesta=>{
            $("#mensaje_ModificarMaquina").html("-Ejercicio Modificado Correctamente.");
            console.log(respuesta)
        })
        }
    });

















        var fotoEM
    $("#fotoEM").change(function(e){
        fotoEM = e.target.files[0]
        var preview = URL.createObjectURL(fotoEM) 
        $("#fotoJ")[0].src=preview
        $("#labelE")[0].innerHTML="Nueva Miniatura"
    });


        var videoEM
    $("#videoEM").change(function(e){
        videoEM = e.target.files[0]
        var preview = URL.createObjectURL(videoEM) 
        $("#labelM")[0].innerHTML="Nuevo video del Ejercicio"
        $("#VideoJ")[0].src=preview
    });


    //Modificacion de los Ejercicios
    $("#FormModificarEjercicios").submit(function(e){
        e.preventDefault();    
        var nombreEjercicio = $("#nombreE").val();
        var rolTipoM = $("#RolTipoMusculo").val();
        var rolTipoMaquina = $("#RolTipoMaquina").val();
        var modificarFichaE = $("#fichaME").val();
        var IDe = $("#idE")[0].innerHTML;
        
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
            var formulario = new FormData();
                    formulario.append("titulo", nombreEjercicio);
                    formulario.append("ficha", modificarFichaE);
                    formulario.append("tipoMusculo", rolTipoM);
                    formulario.append("tipoMaquina", rolTipoMaquina);
                    if(videoEM){
                        formulario.append("video", videoEM);
                    }

                    if(fotoEM){
                        formulario.append("video", fotoEM);
                    }
                    
                    

                fetch( apiUrl + '/modificar/modificarEjercicio/'+ IDe, {
                    method: 'PUT',
                    body: formulario
                }).then(respuesta=>{
                    respuesta.json()

                }).then(respuesta=>{
                    $("#mensaje_ModificarEjercicio").html("-Ejercicio Modificado Correctamente.");
                    console.log(respuesta)
                }) 
            

        }
    });
});
