import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  constructor(private http:HttpClient) { }

  private  apiUrl="http://192.168.0.13:3000";

  //Registro Usuario
  registroUsuario(informacion:any){
    return fetch(this.apiUrl+"/creacion/registroUsuario",{
      method:"POST",
      body:informacion
    })
  }
  //login
  login(codigo:any){
    return fetch(this.apiUrl+"/creacion/login",{
      method:"POST",
      body:codigo
    })
  }

  guardarHorario(formulario:any){
    return fetch(this.apiUrl+"/creacion/crearHorario",{
      method:"POST",
      body:formulario
    })
  }
   
  horariosTomados(rut:any){
    return fetch(this.apiUrl+"/validaciones/horariosTomados",{
      method:"POST",
      body:rut
    })
  }
  //validar repetición de correo
  correoRepetido(correo:any){ 
     return fetch(this.apiUrl+"/validaciones/validarCorreo",{
      method:"POST",
      body:correo
     })
  } 
  
  rutRepetido(run:any){ 
    return fetch(this.apiUrl+"/validaciones/rutRepetido",{
     method:"POST",
     body:run
    })
 } 

   traerHorarios(){
    return fetch(this.apiUrl+"/validaciones/traerHorarios",{
      method:"GET"
    })
   }
 
}
