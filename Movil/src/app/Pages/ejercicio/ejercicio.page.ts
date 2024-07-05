import { FocusMonitor } from '@angular/cdk/a11y';
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

    
  
    id:string = "";
    ejercicio:any={};
    videoName:string="";
    fotoName:string="";
  constructor(private router: Router,private toastController: ToastController,private api:ExpressService,
    private activatedRouter:ActivatedRoute,private loadingCtrl: LoadingController) { }

  ionViewWillEnter(){
    this.boton = false;
    this.apiUrl = this.api.urlApi
    this.id = String(this.activatedRouter.snapshot.paramMap.get('id'))
    this.loading(30000).then(async response=>{
      response.present();
      await this.api.detalleEjercicio(this.id).then(res=>res.json()).then(res=>{
        this.ejercicio = res
        this.videoName = this.ejercicio.video;this.fotoName = this.ejercicio.foto
        this.ejercicio.foto = this.apiUrl+"imagenes/MiniaturaEjercicios/"+this.ejercicio.foto
        this.ejercicio.video = this.apiUrl+"videos/"+this.ejercicio.video
        console.log(this.ejercicio)
        // console.log(this.ejercicio)
        })
      await this.agregarRecomendados().then(res=>res.json()).then(res=>{
        console.log(res)
      })
      await this.api.buscarGuardados(JSON.parse(String(localStorage.getItem("idUser"))).rut).then(res=>res.json()).then(res=>{
        for(let x of res){
          if(x.idArchivo == this.ejercicio._id){
            this.boton = true;
          }
        }
        response.dismiss();
      })
    })
  }

  agregarRecomendados(){
    var formulario = new FormData();
    formulario.append("rut",JSON.parse(String(localStorage.getItem("idUser"))).rut);
    formulario.append("musculo",this.ejercicio.tipoMusculo);
    return this.api.addRecomendaciones(formulario)
  }
  
  responder(username:any){
    username.mostrar=true;
    this.subComentario="@"+username.username+" "
  }

  sub(x:any){
    x.mostrar=false;
  }

  guardar(){
    var formulario = new FormData();
    formulario.append("rut",JSON.parse(String(localStorage.getItem("idUser"))).rut)
    formulario.append("archivo",this.fotoName);
    formulario.append("idAr",this.ejercicio._id);
    formulario.append("titulo",this.ejercicio.Titulo);
    formulario.append("tipo","ejercicio")
    this.loading(20000).then(response=>{
      response.present();
      this.api.guardarMultimedia(formulario).then(res=>res.json()).then(res=>{
        this.presentToast("bottom","Ejercicio Guardado");
        this.boton=true;
        response.dismiss();
      })
    })
  }

  quitarGuardado(){
    this.loading(20000).then(response=>{
      response.present();
      this.api.quitarGuardado(this.ejercicio._id,JSON.parse(String(localStorage.getItem("idUser"))).rut).then(res=>res.json())
      .then(res=>{
        this.boton=false;
        this.presentToast("bottom","Ejercicio eliminado de tus guardados");
        response.dismiss()
      })
    })
  }



  regresar(){
    if(String(this.activatedRouter.snapshot.paramMap.get('musculo')) == "guardados"){
      this.router.navigate(['guardados'])
    }else{
      this.router.navigate(['/ejercicios/'+String(this.activatedRouter.snapshot.paramMap.get('musculo'))+
        "/"+String(this.activatedRouter.snapshot.paramMap.get('flag'))
      ])
    }
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
