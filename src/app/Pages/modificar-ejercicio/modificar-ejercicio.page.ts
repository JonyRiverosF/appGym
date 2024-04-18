import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-ejercicio',
  templateUrl: './modificar-ejercicio.page.html',
  styleUrls: ['./modificar-ejercicio.page.scss'],
})
export class ModificarEjercicioPage implements OnInit {

  imagenNueva:any="";
  video:any;
  crearE:boolean=true;

  formulario:boolean=true;



  ejercicioM:any;

  ejercicios:any=[{
    id:1,
    nombreEjercicio:"press banca plano",
    img:"assets/icon/aperturas.jpg"
  },{
    id:2,
    nombreEjercicio:"press banca inclinado",
    img:"assets/icon/maxi.jpg"
  }]

  constructor(private router: Router) { }

  ngOnInit(){}


  regreso(x:any){
    this.formulario=x;
  }

  
  irModificar(x:any){
    this.formulario=false;
    this.ejercicioM=x;
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
