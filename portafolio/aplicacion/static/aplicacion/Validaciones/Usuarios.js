$(document).ready(function(){
    var ficha 
    var apiUrl = "http://192.168.1.2:3000";
    var flagCorreo = false;
    var flagRut = false;
    var horarios 

    fetch(apiUrl+"/validaciones/traerHorarios",{
        method:"GET"
    }).then(res=>res.json()).then(res=>{
        console.log(res.respuesta)
        horarios=res.respuesta;
    })


    
    $("#fichaU").change(function(e){
        ficha = e.target.files[0]
    });

    function correoRepetido(correo) {
        var formulario = new FormData();
        formulario.append("correo", correo);

        return fetch(apiUrl + "/validaciones/validarCorreo", {
            method: "POST",
            body: formulario
        }).then(res => res.json()).then(respuesta => {
            if (respuesta.respuesta.length > 0) {
                flagCorreo = true;
            } else {
                flagCorreo = false;
            }
            console.log(respuesta);
        });
    }

    function rutRepetido(rut) {
        var formulario = new FormData();
        formulario.append("rut", String(rut));

        return fetch(apiUrl + "/validaciones/rutRepetido", {
            method: "POST",
            body: formulario
        }).then(res => res.json()).then(respuesta => {
            if (respuesta.respuesta.length > 0) {
                flagRut = true;
            } else {
                flagRut = false;
            }
            console.log(respuesta);
        });
    }

    

    var horarioU = document.querySelector('input[type="date"]');
    var fechaHoy = new Date();

    var s = fechaHoy.toLocaleString("es-Es",{month:"2-digit",year:"numeric",day:"2-digit"}).split("/");
    horarioU.min = s[2]+"-"+s[1]+"-"+s[0];
    
    if(fechaHoy.getDay() != 0){
       
        var restoSemana = 6 - fechaHoy.getDay();
        var finDe = fechaHoy.getDate()+restoSemana;
        var e = new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),finDe).toLocaleString("es-Es",{month:"2-digit",year:"numeric",day:"2-digit"}).split("/");
        horarioU.max = e[2]+"-"+e[1]+"-"+e[0]  
    }else{
        var j = new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate()+6).toLocaleString("es-Es",{month:"2-digit",year:"numeric",day:"2-digit"}).split("/");
        horarioU.max = j[2]+"-"+j[1]+"-"+j[0]  
    }
    
    var diaSeleccionado
    
    
    $("#horarioU").change(function(e){

        var fechaH=new Date(e.target.value);
        var fechaNueva=new Date(fechaH.getFullYear(),fechaH.getMonth(),fechaH.getDate()+1).toLocaleString("es-Es",{month:"2-digit",year:"numeric",day:"2-digit"});
        $("#horas")[0].innerText="";
        for(let x of horarios){

            if(fechaNueva == new Date(x.fecha).toLocaleString("es-Es",{month:"2-digit",year:"numeric",day:"2-digit"})){

                diaSeleccionado=x

                $('#horas').append($('<option>', {
                    value: "ola",
                    text: "Seleccione Hora",
                }));

                for(let hora of x.horas){
                    $('#horas').append($('<option>', {
                        value: hora.hora,
                        text: hora.hora,

                    
                    }));
                }
            }
        }
 
    });
    

    var horariosEnviar = []

    $("#horas").change(function(e){
        //console.log( horarioU.value)
        //console.log(e)
        var horarioSeleccionado = {hora:{hora:e.target.value},
                                dia:diaSeleccionado
        }
        horariosEnviar.push(horarioSeleccionado)

        let msjH=""

        for(let x of horariosEnviar){
            msjH+=new Date(x.dia.fecha).toLocaleString("es-Es",{month:"2-digit",year:"numeric",day:"2-digit"}) + " "+x.hora.hora 
            $("#mensajeHora").html(msjH);

        }
        
        //console.log($("#horas"))
        

        if( horariosEnviar.length == 3){
            document.getElementById("horarioU").disabled = true;
            console.log(horariosEnviar)
        }

        //console.log(horariosEnviar)
    })
   

    //Registrar Usuarios
    $("#FormUsuarios").submit(async function(e){
        e.preventDefault();

        var nombreU = $("#nombre").val();
        var apellidoU = $("#apellido").val();
        var Rut = $("#rut").val();
        var Telefono = $("#telefono").val();
        var Correo = $("#correo").val();
        var observacionesU = $("#observacionesU").val();
        var horarioU = document.querySelector('input[type="date"]');
        console.log(horarioU)
         

        let msjMostrar = "";
        let enviar = false;
        
        // Validar Nombre Usuario
        if(nombreU.trim() == ""){
            msjMostrar += "<br>-El nombre del usuario no puede estar vacío.";
            enviar = true;
        }

        if (/\d/.test(nombreU)){
            msjMostrar += "<br>-Nombre del usuario inválido, no puede contener números.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(nombreU)){
            msjMostrar += "<br>-Nombre del usuario inválido, no debe contener caracteres especiales.";
            enviar = true;
        }

        // Validar Apellido Usuario
        if(apellidoU.trim() == ""){
            msjMostrar += "<br>-El apellido del usuario no puede estar vacío.";
            enviar = true;
        }

        if (/\d/.test(apellidoU)){
            msjMostrar += "<br>-Apellido del usuario inválido, no puede contener números.";
            enviar = true;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(apellidoU)){
            msjMostrar += "<br>-Apellido del usuario inválido, no debe contener caracteres especiales.";
            enviar = true;
        }

        //Validar Correo del usuario
        if(Correo.trim() == ""){
            msjMostrar += "<br>-El Correo del usuario no puede estar vacío.";
            enviar = true;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Correo.trim())) {
            msjMostrar += "<br>-El Correo del usuario no tiene un formato válido.";
            enviar = true;
        }


        //Validar Telefono del usuario
        if(Telefono.trim() == ""){
            msjMostrar += "<br>-El Teléfono del usuario no puede estar vacío.";
            enviar = true;
        }

        if (!/^9\d{8}$/.test(Telefono.trim())) {
            msjMostrar += "<br>-El Teléfono del usuario debe contener exactamente 9 dígitos y empezar con 9.";
            enviar = true;
        }

        // Validar Rut Usuario
        if(Rut.trim() == ""){
            msjMostrar += "<br>-El rut del usuario no puede estar vacío.";
            enviar = true;
        }

        if (!validarRut(Rut)) {
            msjMostrar += "<br>-El rut del usuario no es válido.";
            enviar = true;
        }

        function validarRut(rut) {
            // Verificar si el RUT está en blanco
            if (rut.trim() === "") {
                return false;
            }
        
            // Separar el cuerpo del RUT del dígito verificador
            var rutCompleto = rut.split("-");
            var cuerpo = rutCompleto[0].replace(/\./g, "");
            var dv = rutCompleto[1];
        
            // Validar el cuerpo del RUT
            if (cuerpo.length < 7) {
                return false;
            }
        
            // Calcular el dígito verificador esperado
            var suma = 0;
            var multiplo = 2;
        
            for (var i = 1; i <= cuerpo.length; i++) {
                var index = multiplo * parseInt(cuerpo.charAt(cuerpo.length - i));
                suma += index;
        
                if (multiplo < 7) {
                    multiplo += 1;
                } else {
                    multiplo = 2;
                }
            }
        
            var dvEsperado = 11 - (suma % 11);
            dvEsperado = (dvEsperado === 11) ? 0 : (dvEsperado === 10) ? "K" : dvEsperado.toString();
        
            // Validar el dígito verificador
            return dvEsperado === dv.toUpperCase();
        }
     
        
          

          if(enviar){
            $("#mensaje_RegistrarUsuarios").html(msjMostrar);
            
        } else {

            await correoRepetido (Correo)
                console.log("Correo repetido verificado. flagCorreo:", flagCorreo);
                
                if (!flagCorreo) {
                    await rutRepetido(Rut)
                        console.log("Rut repetido verificado. flagRut:", flagRut);
                        
                        if (!flagRut) {
                            var formulario = new FormData();
                            formulario.append("nombre", nombreU);
                            formulario.append("apellido", apellidoU);
                            formulario.append("rut",String (Rut));
                            formulario.append("telefono", Telefono);
                            formulario.append("correo", Correo);
            
                            if (ficha) {
                                formulario.append("fichaMedica", ficha);
                            } else {
                                formulario.append("fichaMedica", "");
                            }
            
                            if (observacionesU) {
                                formulario.append("observacionMedica", observacionesU);
                            } else {
                                formulario.append("observacionMedica", "No presenta problemas de salud");
                            }
            
                            formulario.append("rol", 1);
                            formulario.append("imagen", "");

                            fetch(apiUrl + "/creacion/registroUsuario", {
                                method: "POST",
                                body: formulario
                            }).then(res => {

                                var formularioHorario = new FormData();
                                formularioHorario.append("horarioUno", JSON.stringify(horariosEnviar[0]));
                                formularioHorario.append("horarioDos", JSON.stringify(horariosEnviar[1]));
                                formularioHorario.append("horarioTres", JSON.stringify(horariosEnviar[2]));
                                formularioHorario.append("rut", Rut);
                                fetch(apiUrl + "/creacion/crearHorario", {
                                    method: "POST",
                                    body: formularioHorario
                                }).then(res=>{
                                    console.log(res);
                                    msjMostrar += "Usuario Registrado Correctamente.";
                                })
                                
                            });
            
                            $("#mensaje_RegistrarUsuarios").html("-Usuario Registrado Correctamente.");
                            $("#nombre")[0].value=""; $("#apellido")[0].value=""; $("#rut")[0].value=""; 
                            $("#telefono")[0].value=undefined; $("#correo")[0].value="";
                            $("#fichaU")[0].value="";$("#observacionesU")[0].value="";
                            document.getElementById("fichaSi").checked=false; document.getElementById("fichaNo").checked=false;
                            document.getElementById("fichaMedicaSi").style.display="none";
                            document.getElementById("fichaMedicaNo").style.display="none";

                            
                            

                        } else {
                            $("#mensaje_RegistrarUsuarios").html("<br>-El rut ingresado ya está registrado.");
                            
                        }
                    } else {
                         $("#mensaje_RegistrarUsuarios").html("<br>-El correo ingresado ya está registrado.");
                         
                    }
                    
                }
        });
    });
        
        






    



    $(document).ready(function(){

        var apiUrl = "http://192.168.1.2:3000";
    
        $("#FormModiUsuarios").submit(function(e){
            
            var nombreU = $("#nombre").val();
            var apellidoU = $("#apellido").val();
            var telefonoU = $("#telefono").val();
            var correoU = $("#correo").val();
            var rutU = $("#rut").val();
            var rolU = $("#RolU").val();

        
            let msjMostrar = "";
            let enviar = false;
        
            // Validar Nombre Usuario
            if(nombreU.trim() == ""){
                msjMostrar += "<br>-El nombre del usuario no puede estar vacío.";
                enviar = true;
            }
        
            if (/\d/.test(nombreU)){
                msjMostrar += "<br>-Nombre del usuario inválido, no puede contener números.";
                enviar = true;
            }
        
            if (/[!@#$%^&*(),.?":{}|<>]/.test(nombreU)){
                msjMostrar += "<br>-Nombre del usuario inválido, no debe contener caracteres especiales.";
                enviar = true;
            }
        
            // Validar Apellido Usuario
            if(apellidoU.trim() == ""){
                msjMostrar += "<br>-El apellido del usuario no puede estar vacío.";
                enviar = true;
            }
        
            if (/\d/.test(apellidoU)){
                msjMostrar += "<br>-Apellido del usuario inválido, no puede contener números.";
                enviar = true;
            }
        
            if (/[!@#$%^&*(),.?":{}|<>]/.test(apellidoU)){
                msjMostrar += "<br>-Apellido del usuario inválido, no debe contener caracteres especiales.";
                enviar = true;
            }
        
            //Validar Correo del usuario
            if(correoU.trim() == ""){
                msjMostrar += "<br>-El Correo del usuario no puede estar vacío.";
                enviar = true;
            }
        
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correoU.trim())) {
                msjMostrar += "<br>-El Correo del usuario no tiene un formato válido.";
                enviar = true;
            }
        
            //Validar Telefono del usuario
            if(telefonoU.trim() == ""){
                msjMostrar += "<br>-El Teléfono del usuario no puede estar vacío.";
                enviar = true;
            }
        
            if (!/^9\d{8}$/.test(telefonoU.trim())) {
                msjMostrar += "<br>-El Teléfono del usuario debe contener exactamente 9 dígitos y empezar con 9.";
                enviar = true;
            }
        
            if(enviar){
                $("#mensaje_ModificarUsuarios").html(msjMostrar);
            } else {
                var formulario = new FormData();
                    formulario.append("nombre", nombreU);
                    formulario.append("apellido", apellidoU);
                    formulario.append("telefono", telefonoU);
                    formulario.append("correo", correoU);
                    formulario.append("rol", rolU);

                fetch( apiUrl + '/modificar/modificarUsuario/'+ rutU, {
                    method: 'PUT',
                    body: formulario
                }).then(respuesta=>{
                    respuesta.json()

                }).then(respuesta=>{
                    $("#mensaje_ModificarUsuarios").html("-Usuario Modificado Correctamente.");
                    console.log(respuesta)
                }) 
            }   
        });
    });












    $(document).ready(function(){

        
        var apiUrl = "http://192.168.1.2:3000";
        

    //Solicitud Usuario
    $("#FormSolicitud").submit(function(e){
        var textArea = $("#textoSoli").val();
        var idUsuarioS = $("#idU")[0].innerHTML;
        

        let msjMostrar = "";
        let enviar = false;

        //Validar Correo del usuario
        if(textArea.trim() == ""){
            msjMostrar += "<br>-La respuesta de la solicitud no puede estar vacía.";
            enviar = true;
        }

          if(enviar){
            $("#mensaje_enviarSoli").html(msjMostrar);
            e.preventDefault();
        }
        else{
            var formulario = new FormData();
                    formulario.append("respuestaAdmin", textArea);
                    
                fetch( apiUrl + '/validaciones/respuestaSoli/'+ idUsuarioS, {
                    method: 'POST',
                    body: formulario
                }).then(respuesta=>{
                    respuesta.json()

                }).then(respuesta=>{
                    $("#mensaje_enviarSoli").html("Error al mandar la solicitud.");
                    console.log(respuesta)
                }) 
                
            }
        });
    

});