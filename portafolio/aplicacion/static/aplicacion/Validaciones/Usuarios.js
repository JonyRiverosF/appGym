$(document).ready(function(){
    //Registrar Usuarios
    $("#FormUsuarios").submit(function(e){

        var nombreU = $("#nombre").val();
        var apellidoU = $("#apellido").val();
        var Rut = $("#rut").val();
        var DV = $("#dv").val();
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
});