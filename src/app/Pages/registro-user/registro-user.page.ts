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

  //Variables con el ngModel
  nombre:string="";
  apellido:string="";
  rut:string="";
  digitoVerificador:string="";
  horario1:string="";
  horario2:string="";
  respuesta:string="";
  pregunta:string="";


  //Mensajes
  mensajeName: string = "";
  mensajeNameN: string = "";
  mensajeNameE: string = "";

  mensajeApellido: string = "";
  mensajeApellidoN: string = "";
  mensajeApellidoE: string = "";

  mensajePregunta:string="";
  mensajeRespuesta:string="";

  mensajeRut: string = "";
  mensajeDigitoVerificador: string = "";
  mensajeHorario: string = "";
  mensajeHorario1: string = "";


  colorItemName: string = "light";
  colorItemApellido: string = "light";
  colorItemRut: string = "light";
  colorItemDigitoVerificador: string = "light";
  colorItemHorario: string = "light";
  colorItemPregunta:string="light";
  colorItemRespuesta:string="light";

  flag:boolean=true;

  constructor(private router: Router,private alertController: AlertController,  private loadingCtrl: LoadingController
    ,private toastController: ToastController,private api:ExpressService) { }

  ngOnInit() {
  }

  verificarRegistro(nombre: string, apellido: string, rut: string, digitoVerificador: string, horario1: string, horario2: string, pregunta: string, respuesta:string) {

    //Cada vez que se presione el botón, los mensajes de declararán vacias
    this.mensajeName = "";
    this.mensajeNameN = "";
    this.mensajeNameE = "";

    this.mensajeApellido = "";
    this.mensajeApellidoE="";
    this.mensajeApellidoN="";
    
    this.mensajePregunta="";
    this.mensajeRespuesta="";

    this.mensajeRut = "";

    this.mensajeDigitoVerificador = "";

    this.mensajeHorario = "";

    this.colorItemApellido = "light";
    this.colorItemName = "light";
    this.colorItemRut = "light";
    this.colorItemDigitoVerificador = "light";
    this.colorItemHorario = "light";
    this.colorItemPregunta= "light";
    this.colorItemRespuesta= "light";
    
    let flag = true;

     // VALIDACIÓN DEL NOMBRE
     if (nombre.trim() === "") {
      this.mensajeName = "El nombre no puede estar vacío";
      this.colorItemName = "danger";
      flag = false;
    } 
    if (this.tieneNumeros(nombre)) {
      this.mensajeNameN = "El nombre no debe contener números";
      this.colorItemName = "danger";
      flag = false;
    }
    if (this.tieneCaracterEspecial(nombre)) {
        this.mensajeNameE = "El nombre no debe contener caracteres especiales";
        this.colorItemName = "danger";
        flag = false;
    }
    

    // VALIDACIÓN DEL APELLIDO
    if (apellido.trim() === "") {
      this.mensajeApellido = "El apellido no puede estar vacío";
      this.colorItemApellido = "danger";
      flag = false;
    } 
    if (this.tieneNumerosA(apellido)) {
      this.mensajeApellidoN = "El apellido no debe contener números";
      this.colorItemApellido = "danger";
      flag = false;
    }
    if (this.tieneCaracterEspecialA(apellido)) {
      this.mensajeApellidoE = "El apellido no debe contener caracteres especiales";
      this.colorItemApellido = "danger";
      flag = false;
    }
    

    // VALIDACIÓN DEL RUT
    if (!this.validarRut(rut)) {
      this.mensajeRut = "El RUT debe tener exactamente 8 dígitos";
      this.colorItemRut = "danger";
      flag = false;
    }


    // VALIDACIÓN DEL DÍGITO VERIFICADOR
    if (digitoVerificador.trim() === "") {
      this.mensajeDigitoVerificador = "El digito verificador no puede estar vacio";
      this.colorItemDigitoVerificador = "danger";
      flag = false;
    }

    if(this.calcularVerificador(rut)!=digitoVerificador){
      this.mensajeDigitoVerificador="Digito verificador incorrecto"
    }

    // VALIDACIÓN DE LOS HORARIOS
    if (horario1.trim() === "" && horario2.trim() === "") {
      this.mensajeHorario = "Seleccione al menos un horario";
      this.colorItemHorario = "danger";
      flag = false;
      
    } 
  console.log(horario1);


    // VALIDACIÓN DE LOS Pregunta
    if (pregunta.trim() === "") {
      this.mensajePregunta = "Seleccione alguna pregunta";
      this.colorItemHorario = "danger";
      flag = false;
    }

    // VALIDACIÓN DE LOS Respuesta
    if (respuesta.trim() === "") {
      this.mensajeRespuesta = "Escriba alguna respuesta a su pregunta";
      this.colorItemRespuesta = "danger";
      flag = false;
    }
    

    // REDIRECCIÓN A LOS PLANES DEL GIMNASIO
    if (flag) {
      this.flag =true;
      var formulario = new FormData();
      formulario.append("nombre",nombre);
      formulario.append("apellido",apellido);
      formulario.append("rut",rut);
      formulario.append("dv",digitoVerificador);
      formulario.append("horario1","Lun-Mie-Vie "+horario1);
      formulario.append("horario2","Mar-Jue-Sab "+horario2);
      formulario.append("respuesta",respuesta);
      formulario.append("pregunta",pregunta);
      //
      this.loading(60000).then(response=>{
        response.present();
        this.api.registroUsuario(formulario).then(res=>res.json()).then(json=>{
          console.log(json)
          response.dismiss();
          this.loading(2000).then(response=>{
            this.presentToast("bottom","Usuario registrado correctamente",2500);
          })
        }).catch(err=>{
          console.log(err)
        })
      })
    }
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
  return /[!@#$%^&*-_(),.?":{}|<>]/.test(nombre);
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
  return /[!@#$%^&*-_(),.?":{}|<>]/.test(apellido);
}

//Rut
validarRut(rut: string): boolean {
  // Expresión regular que verifica que el RUT tenga exactamente 8 dígitos
  const regex = /^\d{8}$/;
  return regex.test(rut);
}

//DV
calcularVerificador(rut:string) {
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
