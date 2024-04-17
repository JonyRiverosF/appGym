import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //formulario
  codigo!:number
  msj:string="";
  //flag
  codigoEncontrado:boolean=false;
  constructor(private router: Router) {
  }
   
  irPerfil(){
    this.router.navigate(['/perfil']);
  }

  codigoVerificado(){
    //formulario
    this.msj = "";
    var num = this.codigo.toString()
    if(num.length < 4 || num.length > 4){
      this.msj="el código solo debe tener 4 números"
    }  
  }

}
