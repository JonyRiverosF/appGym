import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  constructor(private http:HttpClient) { }

  private  apiUrl="http://192.168.0.18:3000";

  public urlApi = "http://192.168.0.18:3000/creacion/"


  //GET
  pagoList(){
    return fetch(this.apiUrl+"/validaciones/pagoListo",{
      method:"GET"
    })
  }
  
  subscribe(){
   
    return fetch(this.apiUrl + '/validaciones/subscribe', {
        method: 'POST',

      })
    }

  consEst(form:any){
    return fetch(this.apiUrl+"/validaciones/estadoTr",{
      method:"POST",
      body:form
    })
  }


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

  buscarGuardados(rut:any){
    return fetch(this.apiUrl+"/consultas/traerGuardados/"+rut,{
      method:"GET"
    })
  }

  quitarGuardado(id:any,rut:any){
    return fetch(this.apiUrl+"/modificar/eliminarGuardado/"+id+"/"+rut,{
      method:"DELETE"
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

  recuperarSoli(formulario:any){
      return fetch(this.apiUrl+"/validaciones/recuperarCodigo",{
        method:"POST",
        body:formulario
      }
      )
  }

  guardarHorario(formulario:any){
    return fetch(this.apiUrl+"/creacion/crearHorario",{
      method:"POST",
      body:formulario
    })
  }
   
  guardarMultimedia(form:any){
    return fetch(this.apiUrl+"/creacion/guardarMultimedia",{
      method:"POST",
      body:form
    })
  }
  horariosTomados(rut:any){
    return fetch(this.apiUrl+"/validaciones/horariosTomados",{
      method:"POST",
      body:rut
    })
  }
  
  enviarSolicitud(form:any){
    return fetch(this.apiUrl+"/creacion/enviarSolicitud",{
      method:"POST",
      body:form
    })
  }
  insertarComentario(form:any){
    return fetch(this.apiUrl+"/creacion/insertarComentario",{
      method:"POST",
      body:form
    })
  }

  checkIn(rut:any,body:any){
    return fetch(this.apiUrl+"/creacion/checkIn/"+rut,{
      method:"POST",
      body:body
    })
  }
  checkOut(rut:any){
    return fetch(this.apiUrl+"/creacion/checkOut/"+rut,{
      method:"POST"
    })
  }
  reportar(formulario:any){
    return fetch(this.apiUrl+"/creacion/enviarReporte",{
      method:"POST",
      body:formulario
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

 validarUsuario(form:any){
  return fetch(this.apiUrl+"/validaciones/validarUsuario",{
    method:"POST",
    body:form
  })
 }

}
