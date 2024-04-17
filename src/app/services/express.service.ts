import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  constructor(private http:HttpClient) { }

  private  apiUrl="http://192.168.0.20:3000";

  //Registro Usuario
  registroUsuario(informacion:any){
    return fetch(this.apiUrl+"/creacion/registroUsuario",{
      method:"POST",
      body:informacion
    })
  }
  
}
