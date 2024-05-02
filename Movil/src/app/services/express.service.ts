import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  constructor(private http:HttpClient) { }

  private  apiUrl="http://192.168.0.8:3000";

  public urlApi = "http://192.168.0.8:3000/creacion/"


  //GET

  traerNoticias(){
    return fetch(this.apiUrl+"/consultas/traerNoticias",{
      method:"GET"
    })
  }

  traerHorarios(){
    return fetch(this.apiUrl+"/validaciones/traerHorarios",{
      method:"GET"
    })
   }
 
  traerMusculos(){
    return fetch(this.apiUrl+"/consultas/traerMusculos",{
      method:"GET"
    })
  }

  traerMaquinas(){
    return fetch(this.apiUrl+"/consultas/traerMaquinas",{
      method:"GET"
    })
  }

  traerTipoDietas(){
    return fetch(this.apiUrl+"/consultas/traerTipoDietas",{
      method:"GET"
    })
  }

  traerDietasPorTipo(tipo:string){
    return fetch(this.apiUrl+"/consultas/dietasPorTipo/"+tipo,{
      method:"GET"
    })
  }

  traerEjerciciosPorMusculo(musculo:string){
    return fetch(this.apiUrl+"/consultas/ejerciciosPorMusculos/"+musculo,{
      method:"GET"
    })
  }

  traerEjerciciosPorMaquina(maquina:string){
    return fetch(this.apiUrl+"/consultas/ejerciciosPorMaquina/"+maquina,{
      method:"GET"
    })
  }

  detalleEjercicio(id:any){
    return fetch(this.apiUrl+"/consultas/detalleEjercicio/"+id,{
      method:"GET"
    })
  }

  detalleDieta(id:any){
    return fetch(this.apiUrl+"/consultas/detalleDieta/"+id,{
      method:"GET"
    })
  }

  detalleNoticia(id:any){
    return fetch(this.apiUrl+"/consultas/detalleNoticia/"+id,{
      method:"GET"
    })
  }
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
 //
 actualizarHorario(id:string){
  return fetch(this.apiUrl+"/modificar/modificarHorario/"+id,{
    method:"PUT"
  })
 }

}
