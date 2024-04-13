import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-musculos',
  templateUrl: './musculos.page.html',
  styleUrls: ['./musculos.page.scss'],
})
export class MusculosPage implements OnInit {

  constructor(private router: Router) { 
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
