import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-dietas',
  templateUrl: './tipo-dietas.page.html',
  styleUrls: ['./tipo-dietas.page.scss'],
})
export class TipoDietasPage implements OnInit {

  constructor(private router: Router) { }

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

  irtipos(){
    this.router.navigate(['/dieta']);
  }

  ngOnInit() {
  }

}
