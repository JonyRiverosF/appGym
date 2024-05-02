import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-tipo-dietas',
  templateUrl: './tipo-dietas.page.html',
  styleUrls: ['./tipo-dietas.page.scss'],
})
export class TipoDietasPage implements OnInit {

  ///
  apiUrl:string = ""
  ///
  criterioDieta:string="";
  dietas:any;
  constructor(private router: Router,private activatedRouter:ActivatedRoute,private api:ExpressService,
    private loadingCtrl: LoadingController) { }

  ionViewWillEnter(){
    this.apiUrl = this.api.urlApi
    this.criterioDieta = String(this.activatedRouter.snapshot.paramMap.get('tipoDieta'))
    this.loading(30000).then(response=>{
      response.present();
      this.api.traerDietasPorTipo(this.criterioDieta).then(res=>res.json()).then(res=>{
        this.dietas = res
        for(let x of this.dietas){
          x.foto = this.apiUrl+"imagenes/Dietas/"+x.foto
        }
        response.dismiss();
        //console.log(this.dietas)
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

  irtipos(x:string){
    this.router.navigate(['/dieta/'+this.criterioDieta+"/"+x]);
  }

  ngOnInit() {
  }

}
