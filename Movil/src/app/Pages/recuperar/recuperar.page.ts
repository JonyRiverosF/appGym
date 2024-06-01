import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';



@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  
  

  correo:string="";
  constructor(private api:ExpressService,private toastController: ToastController,
    private router:Router,private loadingCtrl: LoadingController) { }

  enviarSoli(){
    var formulario = new FormData();
    formulario.append("correo",this.correo);
    this.loading(10000).then(response=>{
      response.present();
      this.api.recuperarSoli(formulario).then(res=>res.json()).then(res=>{
          this.presentToast("bottom","Código enviado a "+this.correo,3000);
          response.dismiss();
          this.router.navigate(["/home"])
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

  ngOnInit() {
  }

}
