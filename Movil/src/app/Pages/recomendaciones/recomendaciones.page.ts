import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';


@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.page.html',
  styleUrls: ['./recomendaciones.page.scss'],
})
export class RecomendacionesPage implements OnInit {

  reco:any;tendencia:any={}
  veg:any=[];celiaco:any=[];normal:any=[];vegeta:any=[];
  //
  mostrarCeli:boolean=false;mostrarVeggie:boolean=false;
  mostrarVeget:boolean=false;mostrarNormal:boolean=false;
  //
  fotoXd:string="";
  constructor(private router: Router,private activatedRouter:ActivatedRoute,
    private api:ExpressService,private loadingCtrl: LoadingController) {
    
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.reco = this.router.getCurrentNavigation()?.extras?.state?.["reco"]
        this.ordenarDietas(this.reco.dietasRecomendadas)
        this.tendencia = {ejer:this.reco.tendencia[0],veces:this.reco.tendencia[1]}
      } 
      console.log(this.reco)

    })
  }

  awa(x:any){
   this.fotoXd = x;
   this.modal=true;
  }
  verDetalle(id:any){
    this.router.navigate(["/dieta/reco/"+id])
  }
  modal:boolean=false;
  cerrarModal(x:any){
    this.fotoXd = "";
    this.modal=false
  }
  ordenarDietas(rec:any){
    for(let dieta of rec){
      dieta.foto = this.api.urlApi+"imagenes/Dietas/"+dieta.foto;
      let flag=true;
      if(dieta.esVegano){
        this.veg.push({dieta});flag = false;
      }
      if(dieta.esVegetariana){
        this.vegeta.push({dieta});flag = false;
      }
      if(dieta.esCeliaco){
        this.celiaco.push({dieta});flag = false;
      }
      if(flag){
        this.normal.push({dieta})
      }
          
    }
}

mostrarDietas(x:string){
  switch(x){
    case "normal":
      if(this.mostrarNormal){
        this.mostrarNormal = false;
      }else{
        this.mostrarNormal = true;
      }
      break;
    case "celiaco":
      if(this.mostrarCeli){
        this.mostrarCeli = false;
      }else{
        this.mostrarCeli = true;
      }
      break;
    case "veggie":
      if(this.mostrarVeggie){
        this.mostrarVeggie = false;
      }else{
        this.mostrarVeggie = true;
      }
      break;
    case "vegeta":
      if(this.mostrarVeget){
        this.mostrarVeget = false;
      }else{
        this.mostrarVeget = true;
      }
      break;
  }
}
   
loading(duracion:any){
  return this.loadingCtrl.create({
     message: 'Cargando...',
     duration: duracion,
   })
 }
 
  ngOnInit() {
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
