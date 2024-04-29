$(document).ready(function(){

    var ficha 
    var apiUrl = "http://192.168.1.2:3000";
    var flagCorreo = false;
    var flagRut = false;
    
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


    //Registrar Usuarios
    $("#FormUsuarios").submit(async function(e){
        e.preventDefault();

        var nombreU = $("#nombre").val();
        var apellidoU = $("#apellido").val();
        var Rut = $("#rut").val();
        var DV = $("#dv").val();
        var Telefono = $("#telefono").val();
        var Correo = $("#correo").val();
        var observacionesU = $("#observacionesU").val();
        var horarioU = $("#horarioU").val();
         
        console.log(document.querySelector('input[name="ficha"]:checked').value)

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
 
        // Validar Horario Del Usuario
        if(horarioU.trim() == ""){
            msjMostrar += "<br>-El horario del usuario no puede estar vacío.";
            enviar = true;
        }

        // Validar Rut Usuario
        if(Rut.trim() == ""){
            msjMostrar += "<br>-El rut del usuario no puede estar vacío.";
            enviar = true;
        }

        if(!/^\d{7,}$/.test(Rut)){
            msjMostrar += "<br>-El rut del usuario debe contener al menos 7 números.";
            enviar = true;
        }

        if (!enviar) {
            if (!validarRut($("#rut").val(), $("#dv").val())) {
              msjMostrar += "<br>-El RUT ingresado no es válido.";
              enviar = true;
            }
          } 

        // Validar Dígito Verificador del Usuario
        if (DV.trim() == "") {
            msjMostrar += "<br>-El dígito verificador del usuario no puede estar vacío.";
            enviar = true;
        }
  
        if (!/^\d$|^k$/i.test(DV)) {
            msjMostrar += "<br>-El dígito verificador del usuario debe ser un número entre 0 y 9 o la letra 'k' (mayúscula o minúscula).";
            enviar = true;
        }
     
        function validarRut(rut, dv) {
            rut = rut.replace(".", "").replace(".", "").replace("-", "");
          
            if (!/^\d+$/.test(rut) || !/^[0-9kK]{1}$/.test(dv)) {
              return false;
            }
          
            let suma = 0;
            let multiplo = 2;
            for (let i = rut.length - 1; i >= 0; i--) {
              suma += parseInt(rut.charAt(i)) * multiplo;
              if (multiplo < 7) {
                multiplo += 1;
              } else {
                multiplo = 2;
              }
            }
            let dvEsperado = 11 - (suma % 11);
            let dvCalculado = dvEsperado == 10 ? "k" : dvEsperado.toString();
          
            return dvCalculado.toLowerCase() === dv.toLowerCase();
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
                            formulario.append("dv", DV);
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
                                console.log(res);
                                msjMostrar += "Usuario Registrado Correctamente.";
                                
                            });
            
                            $("#mensaje_RegistrarUsuarios").html("-Usuario Registrado Correctamente.");
                            $("#nombre")[0].value=""; $("#apellido")[0].value=""; $("#rut")[0].value=undefined; 
                            $("#dv")[0].value=""; $("#telefono")[0].value=undefined; $("#correo")[0].value="";
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
        
        


    





        $("#FormModiUsuarios").submit(function(e){
            e.preventDefault();
        
            var idUsuario = $("#id").val();
            var nombreU = $("#nombre").val();
            var apellidoU = $("#apellido").val();
            var telefonoU = $("#telefono").val();
            var correoU = $("#correo").val();
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
                fetch('/modificar/modificarUsuario/'+ idUsuario, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "nombre": nombreU,
                        "apellido": apellidoU,
                        "telefono": telefonoU,
                        "correo": correoU,
                        "rol": rolU
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al modificar el usuario');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    $("#mensaje_ModificarUsuarios").html("-Usuario Modificado Correctamente.");
                    // Aquí podrías realizar otras acciones después de modificar al usuario, como actualizar la vista
                })
                .catch(error => {
                    console.error(error);
                    $("#mensaje_ModificarUsuarios").html("Error al modificar el usuario.");
                });
            }

            
        });








    //Recuperar Codigo
    $("#FormRecuperarContra").submit(function(e){
        var Correo = $("#correo").val();
        var Rut = $("#rut").val();
        var DV = $("#dv").val();

        let msjMostrar = "";
        let enviar = false;

        //Validar Correo del usuario
        if(Correo.trim() == ""){
            msjMostrar += "<br>-El Correo del usuario no puede estar vacío.";
            enviar = true;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Correo.trim())) {
            msjMostrar += "<br>-El Correo del usuario no tiene un formato válido.";
            enviar = true;
        }

         // Validar Rut Usuario
         if(Rut.trim() == ""){
            msjMostrar += "<br>-El rut del usuario no puede estar vacío.";
            enviar = true;
        }

        if(!/^\d{8}$/.test(Rut)){
            msjMostrar += "<br>-El rut del usuario debe contener exactamente 8 números.";
            enviar = true;
        }

        if (!enviar) {
            if (!validarRut($("#rut").val(), $("#dv").val())) {
              msjMostrar += "<br>-El RUT ingresado no es válido.";
              enviar = true;
            }
          } 

        // Validar Dígito Verificador del Usuario
        if (DV.trim() == "") {
            msjMostrar += "<br>-El dígito verificador del usuario no puede estar vacío.";
            enviar = true;
        }
  
        if (!/^\d$|^k$/i.test(DV)) {
            msjMostrar += "<br>-El dígito verificador del usuario debe ser un número entre 0 y 9 o la letra 'k' (mayúscula o minúscula).";
            enviar = true;
        }
     
        function validarRut(rut, dv) {
            rut = rut.replace(".", "").replace(".", "").replace("-", "");
          
            if (!/^\d+$/.test(rut) || !/^[0-9kK]{1}$/.test(dv)) {
              return false;
            }
          
            let suma = 0;
            let multiplo = 2;
            for (let i = rut.length - 1; i >= 0; i--) {
              suma += parseInt(rut.charAt(i)) * multiplo;
              if (multiplo < 7) {
                multiplo += 1;
              } else {
                multiplo = 2;
              }
            }
            let dvEsperado = 11 - (suma % 11);
            let dvCalculado = dvEsperado == 10 ? "k" : dvEsperado.toString();
          
            return dvCalculado.toLowerCase() === dv.toLowerCase();
          }

          if(enviar){
            $("#mensaje_RecuperarContra").html(msjMostrar);
            e.preventDefault();
        }
        else{
                $("#mensaje_ModificarUsuarios").html("Error al modificar el usuario.");
            }
        });
    
    

});