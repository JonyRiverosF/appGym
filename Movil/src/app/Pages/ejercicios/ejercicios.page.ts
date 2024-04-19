import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {


  ejercicios=[
    {
    id:1,
    titulo:"Hip-Thrust",
    detalle:"en el collar del perro decia su nombre 'maximiliano', se les escapo a unos analistas programadores del duoc uc",
    img:"assets/icon/maxi.jpg",
    idMusculo:2
    },
    {
    id:2,
    titulo:"Press de Banca",
    detalle:"maximiliano urrejola más conocido el adicto a las barras largas(olimpicas)",
    img:"assets/icon/gym.jpg",
    idMusculo:1
    },
    {
    id:3,
    titulo:"Squats",
    detalle:"maximiliano urrejola más conocido el adicto a las barras largas(olimpicas)",
    img:"assets/icon/maria.jpg",
    idMusculo:2
    }
  ]
  EjerciciosPorMostrar:any;

  constructor(private router: Router,private activatedRoute:ActivatedRoute) { 
  }

  ionViewWillEnter(){
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    console.log(id)
    this.filtrarEjercicios(id);
  }

  filtrarEjercicios(id:any){
    var flagEjercicios = [];
    for(let ejer of this.ejercicios){
      if(ejer.idMusculo == id){
        flagEjercicios.push(ejer)
      }
    }
    this.EjerciciosPorMostrar = flagEjercicios;
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

  irEjercicio(){
    this.router.navigate(['/ejercicio']);
  }

  ngOnInit() {
  }
  

}
