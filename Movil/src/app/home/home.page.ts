import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ExpressService } from '../services/express.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //formulario
  codigo:string="";
  msj:string="";
  validado:boolean=true;

  //flag
  codigoEncontrado:boolean=false;

  constructor(private router: Router,private api:ExpressService, private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {}
   
  ionViewWillEnter(){
    localStorage.clear()
  }
  
  irRecuperar(){
    this.router.navigate(['/recuperar'])
    
  }

  codigoVerificado(){
  
    var irLogin = new FormData();
    irLogin.append("codigo",String(this.codigo))
    this.loading(60000).then(response=>{
      response.present();
      this.api.login(irLogin).then(res=>res.json()).then(json=>{
        console.log(json)
        response.dismiss()
        if(json.usuario.length >0){
          localStorage.setItem("idUser",JSON.stringify(json.usuario[0]))
          this.router.navigate(['/perfil'])
          this.codigo = ""
        }else{
          
          this.presentToast("bottom","Usuario no registrado",2500)
        }
      })
    })
    
  }

  loading(duracion:any){
    return this.loadingCtrl.create({
       message: 'Cargando...',
       duration: duracion,
     })
   }
   
  async presentToast(position: 'top' | 'middle' | 'bottom',mensaje:string,duracion:number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion,
      position: position,
      color:"dark"
    });

    await toast.present();
  }
}
