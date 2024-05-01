import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-musculos',
  templateUrl: './musculos.page.html',
  styleUrls: ['./musculos.page.scss'],
})
export class MusculosPage implements OnInit {
  ///
  apiUrl:string = "http://192.168.0.13:3000/creacion/"
  ///
  IngreMusculos:boolean=true;
  IngreMaquinas:boolean=false;

  listaMusculos:any;
  listaMaquinas:any;
  constructor(private router: Router,private api:ExpressService) { 
  }

  ionViewWillEnter(){
     this.api.traerMusculos().then(res=>res.json()).then(res=>{
       this.listaMusculos = res.respuesta
       for(let musc of this.listaMusculos){
        musc.foto = this.apiUrl+"/imagenes/fotosMusculos/"+musc.foto
       }
     })
     this.api.traerMaquinas().then(res=>res.json()).then(res=>{
      this.listaMaquinas = res.respuesta
      for(let maq of this.listaMaquinas){
        maq.foto = this.apiUrl+"/imagenes/fotoMaquinas/"+maq.foto
       }
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
