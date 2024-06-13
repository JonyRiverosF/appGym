$(document).ready(function(){

    var apiUrl = "http://192.168.1.2:3000";



    $("#fotoD").change(function(e){
        fotoD = e.target.files[0]
        var preview = URL.createObjectURL(fotoD) 
        $("#DietaF").html("<img src="+preview+" style='width:300px; height:300px;' >")
    });

    var vacioVega = "";
    var vacioVege = "";
    var vacioCel = "";
   

    //Creacion de las Dietas
    $("#FormDietas").submit(function(e){
        var nombreDieta = $("#nombreD").val();
        var fichaDieta = $("#fichaD").val();
        var tipoD = $("#RolTipoD").val();
        var vegetarianaS = $("#vegetarianaSi");
        var vegetarianaN = $("#vegetarianaNo");
        var veganaS = $("#vegaSi");
        var veganaN = $("#vegaNo");
        var celiS = $("#celiSi");
        var celiN = $("#celiNo");

        let msjMostrar = "";
        let enviar = false;

        if($("#vegaSi")[0].checked){
            vacioVega=true;
        }
        if($("#vegaNo")[0].checked){
            vacioVega=false;
        }



        if($("#vegetarianaSi")[0].checked){
            vacioVege=true;
        }
        if($("#vegetarianaNo")[0].checked){
            vacioVege=false;
        }



        if($("#celiSi")[0].checked){
            vacioCel=true;
        }
        if($("#celiNo")[0].checked){
            vacioCel=false;
        }

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
                formulario.append("ficha", fichaDieta);
                formulario.append("tipoD", tipoD);
                formulario.append("foto", fotoD);
                formulario.append("esVegano", vacioVega);
                formulario.append("esVegetariana", vacioVege);
                formulario.append("esCeliaco", vacioCel);

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
        var fichaTPD = $("#fichaTPD").val();
        

        let msjMostrar = "";
        let enviar = false;

        // Validar Nombre Dieta
        if(nombreTipoDieta.trim() == ""){
            msjMostrar += "<br>-El nombre de la dieta no puede estar vacío.";
            enviar = true;
        }


        if(enviar){
            $("#mensaje_TipoDietas").html(msjMostrar);
            e.preventDefault();
        }
        else{
            var formulario = new FormData();
                formulario.append("nombre", nombreTipoDieta);
                formulario.append("ficha", fichaTPD);
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
        var vegetarianaS = $("#vegetarianaSi");
        var vegetarianaN = $("#vegetarianaNo");
        var veganaS = $("#vegaSi");
        var veganaN = $("#vegaNo");
        var celiS = $("#celiSi");
        var celiN = $("#celiNo");

        let msjMostrar = "";
        let enviar = false;

        if($("#vegaSi")[0].checked){
            vacioVega=true;
        }
        if($("#vegaNo")[0].checked){
            vacioVega=false;
        }



        if($("#vegetarianaSi")[0].checked){
            vacioVege=true;
        }
        if($("#vegetarianaNo")[0].checked){
            vacioVege=false;
        }



        if($("#celiSi")[0].checked){
            vacioCel=true;
        }
        if($("#celiNo")[0].checked){
            vacioCel=false;
        }

       
        // Validar Nombre Dieta
        if(nombreDieta.trim() == ""){
            msjMostrar += "<br>-El nombre de la dieta no puede estar vacío.";
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
            formulario.append("esVegano", vacioVega);
            formulario.append("esVegetariana", vacioVege);
            formulario.append("esCeliaco", vacioCel);

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