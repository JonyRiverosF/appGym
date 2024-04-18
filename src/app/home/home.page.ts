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
  validado:boolean=true;

  //flag
  codigoEncontrado:boolean=false;

  constructor(private router: Router) {
  }
   
  
  
  irRecuperar(){
    this.router.navigate(['/recuperar'])
    
  }

  codigoVerificado(){

    console.log(this.codigo)
    this.msj="";
    this.validado=true;
    
    //formulario
    if(this.codigo){
    this.msj = "";
    var num = this.codigo.toString()
    if(num.length < 4 || num.length > 4){
      this.validado=false;
      this.msj="el código solo debe tener 4 números"
      }  
    }else{
    this.msj="no puede estar vacio"
    this.validado=false;
  }
  if(this.validado){
    
    this.router.navigate(['/perfil'])
  }
  }

}
