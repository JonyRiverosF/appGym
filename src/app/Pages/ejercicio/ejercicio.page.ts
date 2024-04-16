import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.page.html',
  styleUrls: ['./ejercicio.page.scss'],
})
export class EjercicioPage implements OnInit {

  boton:boolean=false;

  subComentario:string="";

  comentario:string="";

  comen=[{id:1,
    nombre:"juan",
    apellido:"Gana",
    comentario:"Yo quiero hacer el ejercicio con alguien",
    img:"assets/icon/maxi.jpg",
    username:"Juan_Gana",mostrar:false},

    {id:2
    ,nombre:"Victor",
    apellido:"Rosendo",
    comentario:"yo quiero",
    img:"assets/icon/gym.jpg",
    username:"Victor_Rosendo",mostrar:false},

    {id:3,
    nombre:"Maxi",
    apellido:"Urrejola",
    comentario:"Quiero hacerlo con ambos (y el ejercicio tambien)",
    img:"assets/icon/maxi.jpg",
    username:"Maxi_Urrejola",mostrar:false}]
    

  constructor(private router: Router,private toastController: ToastController) { }


  responder(username:any){
    username.mostrar=true;
    this.subComentario="@"+username.username+" "
  }

  sub(x:any){
    x.mostrar=false;
  }

  esconder(){
    this.boton=true;
    this.presentToast("bottom","Ejercicio Guardado");
  }

  sacar(){
    this.boton=false;
    this.presentToast("bottom","Ejercicio eliminado de tus guardados");
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

  async presentToast(position:'bottom',msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  ngOnInit() {
  }

}
