import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.page.html',
  styleUrls: ['./dieta.page.scss'],
})
export class DietaPage implements OnInit {

  ///
  apiUrl:string = ""
  ///
  dietaId:string="";
  boton:boolean=false;
  dieta:any={};link:any;
  fotoName:string="";
  constructor(private router: Router,private toastController: ToastController,private api:ExpressService,
    private activatedRouter:ActivatedRoute,    private loadingCtrl: LoadingController) { }
  
  ionViewWillEnter(){
    this.boton = false;
    this.apiUrl = this.api.urlApi
    this.dietaId = String(this.activatedRouter.snapshot.paramMap.get('id'))
    this.loading(20000).then(async response=>{
      response.present();
      await this.api.detalleDieta(this.dietaId).then(res=>res.json()).then(res=>{
        this.dieta = res
        this.fotoName = this.dieta.foto
        this.dieta.foto = this.apiUrl+"imagenes/Dietas/"+this.dieta.foto
        response.dismiss();
        //console.log(this.dieta)
      })
      await this.api.buscarGuardados(JSON.parse(String(localStorage.getItem("idUser"))).rut).then(res=>res.json()).then(res=>{
        for(let x of res){
          if(x.idArchivo == this.dieta._id){
            this.boton = true;
          }
        }
        response.dismiss();
      })
    })
  }

  guardar(){
    var formulario = new FormData();
    formulario.append("rut",JSON.parse(String(localStorage.getItem("idUser"))).rut)
    formulario.append("archivo",this.fotoName);
    formulario.append("idAr",this.dieta._id);
    formulario.append("titulo",this.dieta.nombre);
    formulario.append("tipo","dieta")
    this.loading(20000).then(response=>{
      response.present();
      this.api.guardarMultimedia(formulario).then(res=>res.json()).then(res=>{
        this.presentToast("bottom","Dieta Guardada");
        this.boton=true;
        response.dismiss();
      })
    })
  }

  quitarGuardado(){
    this.loading(20000).then(response=>{
      response.present();
      this.api.quitarGuardado(this.dieta._id,JSON.parse(String(localStorage.getItem("idUser"))).rut).then(res=>res.json())
      .then(res=>{
        this.boton=false;
        this.presentToast("bottom","Dieta eliminada de tus guardados");
        response.dismiss()
      })
    })
  }



  regresar(){
    if(String(this.activatedRouter.snapshot.paramMap.get('tipoDieta')) == "guardados"){
      this.router.navigate(['guardados'])
    }else{
      this.router.navigate(['/tipo-dietas/'+String(this.activatedRouter.snapshot.paramMap.get('tipoDieta'))])
    }
  }


  loading(duracion:any){
    return this.loadingCtrl.create({
       message: 'Cargando...',
       duration: duracion,
     })
   }


  async presentToast(position:'bottom',msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
    });

    await toast.present();
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

  ngOnInit() {
  }

}
