$(document).ready(function(){

    var ficha 
    
    $("#fichaU").change(function(e){
        ficha = e.target.files[0]
    });

    //Registrar Usuarios
    $("#FormUsuarios").submit(function(e){

        var nombreU = $("#nombre").val();
        var apellidoU = $("#apellido").val();
        var Rut = $("#rut").val();
        var DV = $("#dv").val();
        var Telefono = $("#telefono").val();
        var Correo = $("#correo").val();
        var observacionesU = $("#observacionesU").val();
        var horarioU = $("#horarioU").val();
         
        var apiUrl = "http://192.168.1.2:3000/creacion/"

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
            $("#mensaje_RegistrarUsuarios").html(msjMostrar);
            e.preventDefault();
        }
        else{
            var formulario  = new FormData()
            formulario.append("nombre",nombreU)
            formulario.append("apellido",apellidoU)
            formulario.append("rut",Rut)
            formulario.append("dv",DV)
            formulario.append("telefono",Telefono)
            formulario.append("correo",Correo)

            if (ficha){
                formulario.append("fichaMedica",ficha)
            }
            else{
                formulario.append("fichaMedica","")
            }

            if (observacionesU){
                formulario.append("observacionMedica",observacionesU)
            }
            else{
                formulario.append("observacionMedica","No tienen presenta problemas de salud")
            }

            formulario.append("rol",1)
            formulario.append("imagen","")
            fetch(apiUrl+"/registroUsuario",{
                method:"POST",body:formulario
                
            }).then(res=>{
                console.log(res)
                msjMostrar +="Usuario Registrado Correctamente."
            })

            $("#mensaje_RegistrarUsuarios").html("-Usuario Registrado Correctamente.");
        }
    });


    

    //Modificar Usuarios
    $("#FormModiUsuarios").submit(function(e){
        var nombreU = $("#nombre").val();
        var apellidoU = $("#apellido").val();
        var horarioU = $("#horarioU").val();

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

        // Validar Horario Del Usuario
        if(horarioU.trim() == ""){
            msjMostrar += "<br>-El horario del usuario no puede estar vacío.";
            enviar = true;
        }



        if(enviar){
            $("#mensaje_ModificarUsuarios").html(msjMostrar);
            e.preventDefault();
        }
        else{
            $("#mensaje_ModificarUsuarios").html("-Usuario Modificado Correctamente.");
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
            $("#mensaje_RecuperarContra").html("-Recuperación exitosa.");
        }
          

    });

});