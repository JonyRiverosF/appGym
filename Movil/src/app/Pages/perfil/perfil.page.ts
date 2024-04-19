import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})


export class PerfilPage implements OnInit {

  prueaP:boolean=false;
  prueaA:boolean=false;

  despliega:boolean=false;
  

  peso:number=140;
  altura:number=1.65;

  constructor(private menuCtrl: MenuController,private router: Router) { }

  modificarP(){
    this.prueaP=true;
  }

  guardarP(){
    this.prueaP=false;
  }

  modificarA(){
    this.prueaA=true;
  }

  guardarA(){
    this.prueaA=false;
  }

  despliegaC(){
    this.despliega=true;
  }

  ocultarV(){
    this.despliega=false;
  }

  abrirMenu(){
    this.menuCtrl.enable(true, 'menuEnd');
    this.menuCtrl.open('menuEnd');
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
