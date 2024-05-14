$(document).ready(function(){

    var apiUrl = "http://192.168.1.5:3000";



    $("#fotoD").change(function(e){
        fotoD = e.target.files[0]
        var preview = URL.createObjectURL(fotoD) 
        $("#DietaF").html("<img src="+preview+" style='width:300px; height:300px;' >")
        console.log(fotoD)
    });

    //Creacion de las Dietas
    $("#FormDietas").submit(function(e){
        var nombreDieta = $("#nombreD").val();
        var tipoD = $("#RolTipoD").val();

        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Dieta
        if(nombreDieta.trim() == ""){
            msjMostrar += "<br>-El nombre de la dieta no puede estar vacío.";
            enviar = true;
        }

        if(enviar){
            $("#mensaje_CrearDieta").html(msjMostrar);
            e.preventDefault();
        }
        else{

            var formulario = new FormData();
                formulario.append("nombre", nombreDieta);
                formulario.append("tipoD", tipoD);
                formulario.append("foto", fotoD);

            fetch(apiUrl + "/creacion/CrearDietas", {
                method: "POST",
                body: formulario
            }).then(res => {
                console.log(res);
                msjMostrar += "Dieta Registrada Correctamente."   
            });
            $("#mensaje_CrearDieta").html("-Dieta Creada Correctamente.");
        }
    });
















    $("#fotoTD").change(function(e){
        fotoTD = e.target.files[0]
        var preview = URL.createObjectURL(fotoTD) 
        $("#tipoDF").html("<p style='text-align: center;'><img src="+preview+" style='width:200px;height:200px;' ></p>")
        console.log(fotoTD)
    });


        //Creacion del tipo de dietas
    $("#FormTipoDietas").submit(function(e){
        var nombreTipoDieta = $("#nombreTD").val();
        

        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Dieta
        if(nombreTipoDieta.trim() == ""){
            msjMostrar += "<br>-El nombre de la dieta no puede estar vacío.";
            enviar = true;
        }

        if (/\d/.test(nombreTipoDieta)){
            msjMostrar += "<br>-Nombre de dieta inválido, no puede contener números.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(nombreTipoDieta)){
            msjMostrar += "<br>-Nombre inválido, no debe contener caracteres especiales.";
            enviar = true;
        }

        if(enviar){
            $("#mensaje_TipoDietas").html(msjMostrar);
            e.preventDefault();
        }
        else{
            var formulario = new FormData();
                formulario.append("nombre", nombreTipoDieta);
                formulario.append("foto", fotoTD);

            fetch(apiUrl + "/creacion/CrearTipoDietas", {
                method: "POST",
                body: formulario
            }).then(res => {
                console.log(res);
                msjMostrar += "Tipo de dieta Registrado Correctamente."   
            });
            $("#mensaje_TipoDietas").html("-Tipo de dieta Creada Correctamente.");
        }
    });




        var fotoTDM
    $("#fotoTD").change(function(e){
        fotoTDM = e.target.files[0]
        var preview = URL.createObjectURL(fotoTDM) 
        $("#fotoTDM")[0].src=preview
        $("#labelTD")[0].innerHTML="Nueva foto del Tipo de Dieta"
    });

    //Modificacion tipos de dietas
    $("#FormModificarTD").submit(function(e){
        e.preventDefault();
        var nombreDieta = $("#nombreD").val();
        var idTD = $("#idTD")[0].innerHTML;
        var fichaTD = $("#fichaTD").val();

       
        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Dieta
        if(nombreDieta.trim() == ""){
            msjMostrar += "<br>-El nombre de la dieta no puede estar vacío.";
            enviar = true;
        }

        if(enviar){
            $("#mensaje_ModificarTD").html(msjMostrar);
            e.preventDefault();
        }
        else{

            var formulario = new FormData();
                    formulario.append("nombre", nombreDieta);

                    if(fotoTDM){
                        formulario.append("foto", fotoTDM);
                    }

                    formulario.append("ficha", fichaTD);

                fetch( apiUrl + '/modificar/modificarTiposDietas/'+ idTD, {
                    method: 'PUT',
                    body: formulario
                }).then(respuesta=>{
                    respuesta.json()

                }).then(respuesta=>{
                    $("#mensaje_ModificarTD").html("-Tipo Dieta Modificada Correctamente.");
                    console.log(respuesta)
                    
                })
        }
    });















    var fotoDM
    $("#fotoMDi").change(function(e){
            fotoDM = e.target.files[0];
            var preview = URL.createObjectURL(fotoDM) 
            $("#fotoMDI")[0].src=preview
            $("#labelMDI")[0].innerHTML="Nueva foto de Dieta"
        });

    //Modificacion de las Dietas
    $("#FormModificarDieta").submit(function(e){
        e.preventDefault();
        var nombreDieta = $("#nombreD").val();
        var FichaDD = $("#fichaDD").val();
        var rolTD = $("#RolTipoD").val();
        var idMD = $("#idD")[0].innerHTML;

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

            var formulario = new FormData();
            formulario.append("nombre", nombreDieta);

            if(fotoDM){
                formulario.append("foto", fotoDM);
            }
            
            formulario.append("ficha", FichaDD);
            formulario.append("tipoD", rolTD);

        fetch( apiUrl + '/modificar/modificarDietas/'+ idMD, {
            method: 'PUT',
            body: formulario
        }).then(respuesta=>{
            respuesta.json()

        }).then(respuesta=>{
            $("#mensaje_ModificarDieta").html("-Dieta Modificada Correctamente.");
        })
            
        }
    });
});