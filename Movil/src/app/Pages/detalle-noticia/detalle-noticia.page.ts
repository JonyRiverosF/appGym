import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
})
export class DetalleNoticiaPage implements OnInit {

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

  noticia:any={};

  boton:boolean=false;

  idNoticia:string="";

  apiUrl:string="";

  subComentario:string="";

  comentario:string="";

  constructor(private router: Router, private activatedRouter:ActivatedRoute,private toastController: ToastController,
    private api:ExpressService,private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter(){
    this.apiUrl = this.api.urlApi
    this.idNoticia = String(this.activatedRouter.snapshot.paramMap.get('id'))
    this.loading(20000).then(response=>{
      response.present();
      this.api.detalleNoticia(this.idNoticia).then(res=>res.json()).then(res=>{
        this.noticia = res;
        this.noticia.foto = this.apiUrl+"imagenes/FotosNoticia/"+this.noticia.foto
        this.noticia.video = this.apiUrl+"videos/"+this.noticia.video
        response.dismiss()
        //console.log(this.noticia)
      })
    })
  }

  esconder(){
    this.boton=true;
    this.presentToast("bottom","Me gusta");
  }

  sacar(){
    this.boton=false;
    this.presentToast("bottom","Me gusta eliminado");
  }



  responder(username:any){
    username.mostrar=true;
    this.subComentario="@"+username.username+" "
  }

  sub(x:any){
    x.mostrar=false;
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
