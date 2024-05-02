import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  apiUrl:string="";
  noticias:any;
  constructor(private router: Router,private api:ExpressService,private loadingCtrl: LoadingController) { }

  ionViewWillEnter(){
    this.apiUrl = this.api.urlApi;
    this.loading(20000).then(response=>{
      response.present();
      this.api.traerNoticias().then(res=>res.json()).then(res=>{
        this.noticias = res;
        for(let x of this.noticias){
          x.foto = this.apiUrl+"imagenes/FotosNoticia/"+x.foto
        }
        response.dismiss()
        //console.log(this.noticias)
      })
    })
  }

  ngOnInit() {
  }

  irDetalle(id:any){

    this.router.navigate(['/detalle-noticia/'+id])
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
  

}
