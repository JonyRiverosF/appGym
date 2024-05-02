import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.page.html',
  styleUrls: ['./dietas.page.scss'],
})
export class DietasPage implements OnInit {

  ///
  apiUrl:string = ""
  ///

  tipoDietas:any;
  
  constructor(private router: Router,private api:ExpressService,private loadingCtrl: LoadingController) { }

  ionViewWillEnter(){
    this.apiUrl = this.api.urlApi
    this.loading(30000).then(response=>{
      response.present();
      this.api.traerTipoDietas().then(res=>res.json()).then(res=>{
        this.tipoDietas = res
        for(let x of this.tipoDietas){
           x.foto = this.apiUrl+"imagenes/TipoDietas/"+x.foto
        }
        response.dismiss();
        //console.log(this.tipoDietas)
      })
    })
  }

  loading(duracion:any){
    return this.loadingCtrl.create({
       message: 'Cargando...',
       duration: duracion,
     })
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

  irTipos(x:string){
    this.router.navigate(['/tipo-dietas/'+x]);
  }

  ngOnInit() {
  }

}
