import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {

  mostrarEjercicios:boolean=true;
  mostrarDieta:boolean=false;

  constructor(private router: Router) { }

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
