import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';


@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.page.html',
  styleUrls: ['./registro-user.page.scss'],
})
export class RegistroUserPage implements OnInit {


  //Variable con los usuarios ya registrados
  usuariosRegistrados:any=[]
  //Variables con el ngModel
  nombre:string="";
  apellido:string="";
  rut:string="";
  digitoVerificador:string="";
  telefono!: number;
  correo:string="";
  observacionMedica:string="";
  fichaMedica:any;


  flagFicha:string= "";
  flagCheckBoxSi:boolean=false;
  flagCheckBoxNo:boolean= false;

  //flags para la pregunta de observación médica
  flagPreguntaSi:boolean=false;
  flagPreguntaNo:boolean= false;
  habilitarObservacion:boolean=false;

  //Mensajes
  mensajeName: string = "";
  mensajeNameN: string = "";
  mensajeNameE: string = "";

  mensajeApellido: string = "";
  mensajeApellidoN: string = "";
  mensajeApellidoE: string = "";

  mensajeRut: string = "";
  mensajeDigitoVerificador: string = "";
  mensajeHorario: string = "";
  mensajeHorario1: string = "";

  mensajeTelefono:string="";
  mensajeTelefono2:string="";

  mensajeCorreo:string="";

  mensajeFichas:string="";

  flag:boolean=true;
  flagCorreo:boolean=false;
  flagRut:boolean=false;

  constructor(private router: Router,private alertController: AlertController,  private loadingCtrl: LoadingController
    ,private toastController: ToastController,private api:ExpressService) { }

  ngOnInit() {
  }

  ar(x:any){
    //var valorExaminar = (x.target.value)
    
    if (this.rut.charAt(this.rut.length-1).toLowerCase() != "k"){
       if(isNaN(Number(this.rut.charAt(this.rut.length-1))) || this.rut.charAt(this.rut.length-1).toLowerCase() == " "){ 
           this.rut = this.rut.slice(0,this.rut.length-1)
        }
    }
   // console.log(this.rut)
    if(this.rut.length >= 8){
      if(this.rut.length == 10){
        var dv = this.rut.charAt(this.rut.length-1);var dvAnterior = this.rut.charAt(this.rut.length-2);
        var rutAntesGuion = this.rut.slice(0,this.rut.length-3);
        this.rut = rutAntesGuion+dvAnterior+"-"+dv
        
      }else{
        if(this.rut.charAt(this.rut.length-1)=="-"){
          var dv = this.rut.charAt(this.rut.length-2)
          var rutAntesGuion = this.rut.slice(0,this.rut.length-2);
          this.rut = rutAntesGuion +"-"+dv;
        }else{
          if(!this.rut.includes("-")){
            var dv = this.rut.charAt(this.rut.length-1)
            var rutAntesGuion = this.rut.slice(0,this.rut.length-1);
            this.rut = rutAntesGuion +"-"+dv;
          }
        }
      }
    }
  }
  async verificarRegistro() {
    //Cada vez que se presione el botón, los mensajes de declararán vacias
    this.mensajeName = "";this.mensajeNameN = ""; this.mensajeNameE = "";

    this.mensajeApellido = "";
    this.mensajeApellidoE="";
    this.mensajeApellidoN="";

    this.mensajeTelefono="";
    this.mensajeTelefono2="";

    this.mensajeCorreo="";

    this.mensajeRut = ""; this.mensajeDigitoVerificador = "";
    this.mensajeHorario = "";this.mensajeFichas="";

   
    let flag = true;

    await this.correoRepetido(this.correo)
    if(this.flagCorreo){
     // this.presentToast("bottom","Correo ya se encuentra registrado",2500);
      this.mensajeCorreo="El correo registrado ya se encuentra en uso"
      flag = false;
    }

    await this.runRepetido(this.rut)
    if(this.flagRut){
      this.mensajeRut = "Este rut ya se encuentra registrado"
      flag=false;
    }
     // VALIDACIÓN DEL NOMBRE
     if (this.nombre.trim() === "") {
      this.mensajeName = "El nombre no puede estar vacío";
      flag = false;
    } 
    if (this.tieneNumeros(this.nombre)) {
      this.mensajeNameN = "El nombre no debe contener números";
      flag = false;
    }
    if (this.tieneCaracterEspecial(this.nombre)) {
        this.mensajeNameE = "El nombre no debe contener caracteres especiales";
        flag = false;
    }
    

    // VALIDACIÓN DEL APELLIDO
    if (this.apellido.trim() === "") {
      this.mensajeApellido = "El apellido no puede estar vacío";
      flag = false;
    } 
    if (this.tieneNumerosA(this.apellido)) {
      this.mensajeApellidoN = "El apellido no debe contener números";
      flag = false;
    }
    if (this.tieneCaracterEspecialA(this.apellido)) {
      this.mensajeApellidoE = "El apellido no debe contener caracteres especiales";
      flag = false;
    }

    // VALIDACIÓN de Telefono
    if (!this.validarTelefono(String(this.telefono))) {
      this.mensajeTelefono = "El teléfono debe comenzar con 9 y tener exactamente 9 dígitos";
      flag = false;
    }

    if (String(this.telefono).trim() === "") {
      this.mensajeTelefono2 = "El campo telefono no puede estar vacío";
      flag = false;
    } 

    // VALIDACIÓN de Correo
    if (!this.validarCorreo(this.correo)) {
      this.mensajeCorreo = "Introduce un correo electrónico válido";
      flag = false;
    }
    
    // VALIDACIÓN DEL RUT
    /*if (!this.validarRut(this.rut)) {
      this.mensajeRut = "El RUT debe tener exactamente 8 dígitos";
      flag = false;
    }*/

    // VALIDACIÓN DEL DÍGITO VERIFICADOR


    if(this.calcularVerificador(this.rut)!=this.digitoVerificador){
      this.mensajeRut="El rut ingresado no es válido"
      flag=false
    }
     
    if((!this.fichaMedica) && this.observacionMedica == ""){
      this.mensajeFichas = "Debe completar la información de su salud";
      flag= false;
    }
    // VALIDACIÓN DE LOs correos repetidos


    


     
    // REDIRECCIÓN A LOS PLANES DEL GIMNASIO
    if (flag) {
      this.flag =true;
      var formulario = new FormData();
      formulario.append("nombre",this.nombre);
      formulario.append("apellido",this.apellido);
      formulario.append("rut",this.rut);
      formulario.append("dv",this.digitoVerificador);
      formulario.append("telefono",String(this.telefono));
      formulario.append("correo",this.correo)
      if(this.fichaMedica){
        formulario.append("fichaMedica",this.fichaMedica);
      }else{
        formulario.append("fichaMedica","");
      }
      formulario.append("observacionMedica",this.observacionMedica)
      //
      this.loading(60000).then(response=>{
        response.present();
        this.api.registroUsuario(formulario).then(res=>res.json()).then(json=>{
          console.log(json)
          response.dismiss();
          this.loading(2000).then(response=>{
            response.present()
            this.router.navigate(["/confirmar-registro"],{state:{"infoUsuario":json.insertado}})
            this.presentAlert("Se ha enviado un código de seguridad al correo "+this.correo+". Debes ingresar "+
            "el código para corroborar tu identidad y finalizar con el registro.")
            response.dismiss()
          })
        }).catch(err=>{
          console.log(err)
        })
      })
    }
}

 adjuntar(x:any){
  this.fichaMedica = x.target.files[0];
  console.log(this.fichaMedica)
  if(this.fichaMedica.type != "application/pdf" && this.fichaMedica.type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
    this.presentAlert("La ficha médica debe estar en formato PDF o WORD");
    this.fichaMedica = undefined
  }

 }

 ficha(x:any){
  console.log(x.detail)
  if(x.detail.checked){
    switch (x.detail.value){
      case "si":
          this.flagFicha = "si";
          this.flagCheckBoxNo = true;
          break;
      case "no":
        this.flagFicha = "no";
        this.flagCheckBoxSi = true;
        break;
    }
  }else{
    switch (x.detail.value){
      case "si":
          this.flagFicha = "";
          this.flagCheckBoxNo = false;
          break;
      case "no":
        this.flagFicha = "";
        this.flagCheckBoxSi = false;
        break;
    }
  }
 }

 preguntaMedica(x:any){
  if(x.detail.checked){
    switch (x.detail.value){
      case "si":
        this.habilitarObservacion = true;
        this.flagPreguntaNo = true;
          break;
      case "no":
        this.habilitarObservacion = false;
        this.observacionMedica = "No presenta problemas de salud"
        this.flagPreguntaSi = true;
        break;
    }
  }else{
    switch (x.detail.value){
      case "si":
        this.habilitarObservacion = false;
        this.flagPreguntaNo = false;
        break;
      case "no":
        this.habilitarObservacion = false;
        this.flagPreguntaSi = false;
        break;
    }
  }
 }


correoRepetido(correo:any){
  var formulario = new FormData();
  formulario.append("correo",correo)

   return this.api.correoRepetido(formulario).then(res=>res.json()).then(respuesta=>{     
      if(respuesta.respuesta.length>0){
        this.flagCorreo= true;
      }else{
         this.flagCorreo= false;
      }
     // console.log(respuesta)
 })
}

runRepetido(run:any){
  var formulario = new FormData();
  formulario.append("rut",String(run))

   return this.api.rutRepetido(formulario).then(res=>res.json()).then(respuesta=>{     
      if(respuesta.respuesta.length>0){
        this.flagRut= true;
      }else{
         this.flagRut= false;
      }
     // console.log(respuesta)
 })
}

  loading(duracion:any){
   return this.loadingCtrl.create({
      message: 'Cargando...',
      duration: duracion,
    })
  }

async showLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Cargando...',
    duration: 5000,
  });

  loading.present();
}



//Nombre Errores
tieneNumeros(nombre: string): boolean {
  if(nombre==""){
    return true;
  }
  return /\d/.test(nombre); 
}

tieneCaracterEspecial(nombre: string): boolean {
  if(nombre==""){
    return true;
  }
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(nombre);
}


//Apellido Errores
tieneNumerosA(apellido: string): boolean {
  if(apellido==""){
    return true;
  }
  return /\d/.test(apellido); 
}

tieneCaracterEspecialA(apellido: string): boolean {
  if(apellido==""){
    return true;
  }
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(apellido);
}

//Numero de telefono
validarTelefono(telefono: string): boolean {
  return /^9\d{8}$/.test(telefono);
}

//Correo
validarCorreo(correo: string): boolean {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexCorreo.test(correo);
}

//Rut
validarRut(rut: string): boolean {
  // Expresión regular que verifica que el RUT tenga exactamente 8 dígitos
  return true;
  const regex = /^\d{8}$/;
  return regex.test(rut);
}

//DV
calcularVerificador(rut:string) {
  var dve = rut.charAt(rut.length-1)
  this.digitoVerificador = dve
  if(rut.length < 9){
    return null
  }else{ 
      rut = rut.slice(0,rut.length-2)
      //console.log(rut)
      rut = rut.toString();
      let sum = 0;
      let mul = 2;
    
      let i = rut.length;
      while (i--) {
        sum = sum + parseInt(rut.charAt(i)) * mul;
        if (mul % 7 === 0) {
          mul = 2;
        } else {
          mul++;
        }
      }
    
      const res = sum % 11;
    
      if (res === 0) {
        console.log(res);
        return '0';
      } else if (res === 1) {
        console.log(res);
        return 'k';
      }
    
      const resto = 11 - res;
      const dv = resto.toString();
      console.log(dv);
      return dv;
           
    }
}


async presentAlert(mensaje:string) {
  const alert = await this.alertController.create({
    header: 'Alerta',
    subHeader: 'Seguridad de la contraseña',
    message: mensaje,
    buttons: ['OK'],
  });
  await alert.present();
}

  //Esta es la función de los mensajes
  async presentToast(position: 'top' | 'middle' | 'bottom',mensaje:string,duracion:number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion,
      position: position,
      color:"dark"
    });

    await toast.present();
  }
  irPerfil(){
    this.router.navigate(['/perfil-admin']);
  }

  RegistroU(){
    this.router.navigate(['/registro-user']);
  }

  irDietas(){
    this.router.navigate(['/crear-dieta']);
  }

  irMusculos(){
    this.router.navigate(['/crear-ejercicio']);
  }

  irNoticias(){
    this.router.navigate(['/crear-noticia']);
  }

}
