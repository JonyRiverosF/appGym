import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.page.html',
  styleUrls: ['./ejercicio.page.scss'],
})
export class EjercicioPage implements OnInit {

 
  ///
  apiUrl:string = "";
  ///

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
    
  
    id:string = "";
    ejercicio:any={};
  constructor(private router: Router,private toastController: ToastController,private api:ExpressService,
    private activatedRouter:ActivatedRoute,private loadingCtrl: LoadingController) { }

  ionViewWillEnter(){
    this.apiUrl = this.api.urlApi
    this.id = String(this.activatedRouter.snapshot.paramMap.get('id'))
    this.loading(30000).then(response=>{
      response.present();
      this.api.detalleEjercicio(this.id).then(res=>res.json()).then(res=>{
        this.ejercicio = res
        this.ejercicio.foto = this.apiUrl+"imagenes/MiniaturaEjercicios/"+this.ejercicio.foto
        this.ejercicio.video = this.apiUrl+"videos/"+this.ejercicio.video
        response.dismiss();
       // console.log(this.ejercicio)
      })
    })
  }
  
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



  regresar(){
    this.router.navigate(['/ejercicios/'+String(this.activatedRouter.snapshot.paramMap.get('musculo'))])
  }

  loading(duracion:any){
    return this.loadingCtrl.create({
       message: 'Cargando...',
       duration: duracion,
     })
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
