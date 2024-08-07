import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
})
export class CheckOutPage implements OnInit {

  usuario:any;
  constructor(private toastController: ToastController,private api:ExpressService,
    private alertController: AlertController,private loadingCtrl: LoadingController,private router:Router) {
      }

    ionViewWillEnter(){
      this.loading(20000).then(response=>{
        this.usuario = JSON.parse(String(localStorage.getItem("idUser")))
          if(localStorage.getItem("idUser") == null){
          response.dismiss();
          this.presentAlert("Debes iniciar sesión para realizar el check-out al gimnasio")
          this.router.navigate(["/home"])
          }else{
          response.present();
          this.api.checkOut(String(this.usuario.rut)).then(res=>res.json()).then(res=>{
              response.dismiss();
              this.presentToast("bottom","Has realizado tu check-out exitosamente")
              this.router.navigate(["/recomendaciones"],{state:{"reco":res}}) 
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
