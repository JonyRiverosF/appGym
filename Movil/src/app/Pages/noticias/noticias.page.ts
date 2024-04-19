import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  noticia=[{id:1,
          titulo:"pug se ha encontrado orinando en el gimnasio ",
          detalle:"en el collar del perro decia su nombre 'maximiliano', se les escapo a unos analistas programadores del duoc uc",
          img:"assets/icon/maxi.jpg"},

          {id:2
          ,titulo:"maxi sube videos a tik tok",
          detalle:"maximiliano urrejola más conocido el adicto a las barras largas(olimpicas)",
          img:"assets/icon/gym.jpg",}]
          
  constructor(private router: Router) { }

  ngOnInit() {
  }

  irDetalle(noticia:any){
    let navigationextra:NavigationExtras={
      state:{
        noticia:noticia
    }
  }
    this.router.navigate(['/detalle-noticia'],navigationextra)
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
