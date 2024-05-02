import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.page.html',
  styleUrls: ['./dieta.page.scss'],
})
export class DietaPage implements OnInit {

  ///
  apiUrl:string = ""
  ///
  dietaId:string="";
  boton:boolean=false;
  dieta:any={};link:any;
  constructor(private router: Router,private toastController: ToastController,private api:ExpressService,
    private activatedRouter:ActivatedRoute,    private loadingCtrl: LoadingController) { }
  
  ionViewWillEnter(){
    this.apiUrl = this.api.urlApi
    this.dietaId = String(this.activatedRouter.snapshot.paramMap.get('id'))
    this.loading(20000).then(response=>{
      response.present();
      this.api.detalleDieta(this.dietaId).then(res=>res.json()).then(res=>{
        this.dieta = res
        this.dieta.foto = this.apiUrl+"imagenes/Dietas/"+this.dieta.foto
        response.dismiss();
        //console.log(this.dieta)
      })
    })
  }

  volver(){
    this.router.navigate(['/tipo-dietas/'+String(this.activatedRouter.snapshot.paramMap.get('tipoDieta'))])
  }
  esconder(){
    this.boton=true;
    this.presentToast("bottom","Dieta guardada");
  }

  mostrarB(){
    this.boton=false;
    this.presentToast("bottom","Dieta eliminada de tus guardados");
  }


  loading(duracion:any){
    return this.loadingCtrl.create({
       message: 'Cargando...',
       duration: duracion,
     })
   }


  async presentToast(position:'bottom',msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  irPerfil(){
    this.router.navigate(['/perfil']);
  }

  irGuardados(){
    this.router.navigate(['/guardados']);
  }

  irDietas(){
    this.router.navigate(['/dietas']);
  }

  irMusculos(){
    this.router.navigate(['/musculos']);
  }

  irNoticias(){
    this.router.navigate(['/noticias']);
  }

  ngOnInit() {
  }

}
