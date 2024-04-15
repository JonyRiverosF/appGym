import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-ejercicio',
  templateUrl: './crear-ejercicio.page.html',
  styleUrls: ['./crear-ejercicio.page.scss'],
})
export class CrearEjercicioPage implements OnInit {

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
