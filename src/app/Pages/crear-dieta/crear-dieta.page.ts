import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-dieta',
  templateUrl: './crear-dieta.page.html',
  styleUrls: ['./crear-dieta.page.scss'],
})
export class CrearDietaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }




  



  irPerfil(){
    this.router.navigate(['/perfil-admin']);
  }

  RegistroU(){
    this.router.navigate(['/registro-user']);
  }

  irDietas(){
    this.router.navigate(['/crear-dieta']);
  }

  irMusculos(){
    this.router.navigate(['/crear-ejercicio']);
  }

  irNoticias(){
    this.router.navigate(['/crear-noticia']);
  }

}
