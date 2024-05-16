import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {

  asunto:string="";detalle:string="";
  colorAsunto:string=" --background: rgb(19, 93, 102);";colorDetalle:string=" --background: rgb(19, 93, 102);";
  mensajeAsunto:string="";mensajeDetalle:string="";

  flag:boolean = true;usuario:any;
  constructor(private api:ExpressService,private router:Router,private toastController: ToastController,
    private loadingCtrl: LoadingController) { }

  enviarSolicitud(){
    this.colorAsunto="--background: rgb(19, 93, 102);";
    this.colorDetalle = "--background: rgb(19, 93, 102);";
    this.mensajeAsunto = "";this.mensajeDetalle = ""
    this.flag = true;

    if(this.asunto.trim() == ""){
      this.colorAsunto ="--background: rgb(205, 33, 33);";
      this.mensajeAsunto = "No debe estar vacío el asunto"
      this.flag = false;
    }
    if(this.detalle.trim()== ""){
      this.colorDetalle = "--background: rgb(205, 33, 33);";
      this.mensajeDetalle = "No debe estar vacío el detalle de la solicitud"
      this.flag = false;
    }

    if(this.flag){
      this.usuario = JSON.parse(String(localStorage.getItem("idUser")))
      var formulario = new FormData();
      formulario.append("nombre",String(this.usuario.nombre+" "+this.usuario.apellido ));
      formulario.append("correo",String(this.usuario.correo));
      formulario.append("asunto",this.asunto);formulario.append("detalle",this.detalle);
      this.loading(20000).then(response=>{
        response.present();
        this.api.enviarSolicitud(formulario).then(res=>res.json()).then(res=>{
          if(!res.msj){
            this.asunto = "";this.detalle="";
            response.dismiss();
            this.router.navigate(["/perfil"])
            this.presentToast("bottom","Mensaje enviado exitosamente",2500)
          }else{
            response.dismiss();
            this.presentToast("bottom","Algo salió mal, intente de nuevo",2500)
          }
        })
      })
    }
  }

  regresar(){
    this.router.navigate(["/perfil"])
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

  loading(duracion:any){
    return this.loadingCtrl.create({
       message: 'Cargando...',
       duration: duracion,
     })
   }
  ngOnInit() {
  }

}
