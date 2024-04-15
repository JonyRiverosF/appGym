import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-dieta',
  templateUrl: './modificar-dieta.page.html',
  styleUrls: ['./modificar-dieta.page.scss'],
})
export class ModificarDietaPage implements OnInit {

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
