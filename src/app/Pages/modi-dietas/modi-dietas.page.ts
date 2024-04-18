import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modi-dietas',
  templateUrl: './modi-dietas.page.html',
  styleUrls: ['./modi-dietas.page.scss'],
})
export class ModiDietasPage implements OnInit {
  
  crearD:boolean=true;
  modificarD:boolean=false;

  imagenNueva:any=""
  video:any

  formulario:boolean=true;
  dietaM:any;

  dietas:any=[{
    img:"assets/icon/dieta1.png",
    nombre:"caloricas",
  },{
    img:"assets/icon/dieta2.png",
    nombre:"sin gluten"
  }]

  constructor(private router: Router) { }

  ngOnInit() {
  }

  regreso(x:any){
    this.formulario=x;
  }

  irModificar(x:any){
    this.formulario=false;
    this.dietaM=x;
  }

  irPerfil(){
    this.formulario=true;
    this.router.navigate(['/perfil-admin']);
  }

  RegistroU(){
    this.formulario=true;
    this.router.navigate(['/registro-user']);
  }

  irDietas(){
    this.formulario=true;
    this.router.navigate(['/crear-dieta']);
  }

  irMusculos(){
    this.formulario=true;
    this.router.navigate(['/crear-ejercicio']);
  }

  irNoticias(){
    this.formulario=true;
    this.router.navigate(['/crear-noticia']);
  }

}
