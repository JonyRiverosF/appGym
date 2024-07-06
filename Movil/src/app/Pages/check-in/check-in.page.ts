import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {
  usuario:any;
  constructor(private toastController: ToastController,private api:ExpressService,
    private alertController: AlertController,private loadingCtrl: LoadingController,private router:Router) {
      
     }
 
  ionViewWillEnter(){
    this.loading(20000).then(response=>{
      this.usuario = JSON.parse(String(localStorage.getItem("idUser")))
       if(localStorage.getItem("idUser") == null){
        response.dismiss();
        this.presentAlert("Debes iniciar sesión para realizar el check-in al gimnasio")
        this.router.navigate(["/home"])
       }else{
        response.present();
        var formulario = new FormData();
        formulario.append("nombre",this.usuario.nombre+" "+this.usuario.apellido)
        this.api.checkIn(String(this.usuario.rut),formulario).then(res=>res.json()).then(res=>{
          if(res.usuario){
            response.dismiss();
            this.presentToast("bottom","Bienvenido al gimnasio")
            this.router.navigate(["/perfil"]) 
          }else{
            response.dismiss();
            this.presentToast("bottom","Ya te encuentras dentro del gimnasio")
            this.router.navigate(["/perfil"]) 
          }
        })
       }
      })
    
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

  async presentToast(position:'bottom',msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      color:"light"
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
