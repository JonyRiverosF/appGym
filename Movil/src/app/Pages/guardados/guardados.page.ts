import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {

  guardados:any;
  guardadosDietas:any=[];
  guardadosEjercicios:any=[];
  mostrarEjercicios:boolean=true;
  mostrarDieta:boolean=false;

  constructor(private router: Router,private api:ExpressService,private loadingCtrl: LoadingController) { }

  ionViewWillEnter(){
    this.guardadosDietas=[];this.guardadosEjercicios=[]
    var run = JSON.parse(String(localStorage.getItem("idUser"))).rut
    this.loading(20000).then(response=>{
      response.present();
      this.api.buscarGuardados(run).then(res=>res.json()).then(res=>{
           this.guardados = res
           for(let x of this.guardados){
             switch (x.tipoArchivo){
               case "ejercicio":
                  x.archivoGuardado = this.api.urlApi+"imagenes/MiniaturaEjercicios/"+x.archivoGuardado
                  this.guardadosEjercicios.push(x);
                  break;
               case "dieta":
                  x.archivoGuardado = this.api.urlApi+"imagenes/Dietas/"+x.archivoGuardado
                  this.guardadosDietas.push(x);
                  break;
             }
           }
           console.log(this.guardadosEjercicios)
           response.dismiss()
      })
    })

  }

  verDetalle(x:any){
    switch (x.tipoArchivo){
      case "ejercicio":
        this.router.navigate(["ejercicio/guardados/"+x.idArchivo])
        break;
      case "dieta":
        this.router.navigate(["dieta/guardados/"+x.idArchivo])
        break;
    }
  }
  mostrarEjercicio(){
    this.mostrarEjercicios=true;
    this.mostrarDieta=false
  }

  mostrarDietas(){
    this.mostrarDieta=true;
    this.mostrarEjercicios=false;
  }
  
  irTipos(){
    this.router.navigate(['/dieta']);
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

  ngOnInit() {
  }

  

}
