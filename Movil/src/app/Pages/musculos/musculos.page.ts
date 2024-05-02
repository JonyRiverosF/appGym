import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-musculos',
  templateUrl: './musculos.page.html',
  styleUrls: ['./musculos.page.scss'],
})
export class MusculosPage implements OnInit {
  ///
  apiUrl:string = ""
  ///
  IngreMusculos:boolean=true;
  IngreMaquinas:boolean=false;

  listaMusculos:any;
  listaMaquinas:any;
  constructor(private router: Router,private api:ExpressService, private loadingCtrl: LoadingController) { 
  }

  ionViewWillEnter(){
    this.apiUrl = this.api.urlApi
    this.loading(30000).then(async response=>{
      response.present();
      await this.api.traerMusculos().then(res=>res.json()).then(res=>{
        this.listaMusculos = res.respuesta
        for(let musc of this.listaMusculos){
         musc.foto = this.apiUrl+"/imagenes/fotosMusculos/"+musc.foto
        }
      })
     await this.api.traerMaquinas().then(res=>res.json()).then(res=>{
       this.listaMaquinas = res.respuesta
       for(let maq of this.listaMaquinas){
         maq.foto = this.apiUrl+"/imagenes/fotoMaquinas/"+maq.foto
        }
      })
      response.dismiss()
    })
  }


  verEjerciciosMusc(x:string){
      this.router.navigate(['/ejercicios/'+x],{state:{flag:false}})
  }

  verEjerciciosMaq(x:string){
    this.router.navigate(['/ejercicios/'+x],{state:{flag:true}})
}

  IngresarMusculos(){
    this.IngreMusculos=true;
    this.IngreMaquinas=false;
  }

  IngresarMaquinas(){
    this.IngreMaquinas=true;
    this.IngreMusculos=false;
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

  irEjercicios(){
    this.router.navigate(['/ejercicios']);
  }

  ngOnInit() {
  }

}
