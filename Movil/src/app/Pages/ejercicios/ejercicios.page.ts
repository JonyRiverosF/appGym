import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {

  ///
  apiUrl:string = ""
  ///

  id:string="";

  ejercicios:any;

  EjerciciosPorMostrar:any;

  criterioEscogido:string="";
  flag:boolean=true;
  constructor(private router: Router,private activatedRouter:ActivatedRoute,private api:ExpressService,
    private loadingCtrl: LoadingController,private toastController: ToastController) {

    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.flag = this.router.getCurrentNavigation()?.extras?.state?.["flag"];
        localStorage.setItem("flagMaqMus",String(this.flag))
      }
    })
  }

  ionViewWillEnter(){
    this.apiUrl = this.api.urlApi
    this.criterioEscogido =  String(this.activatedRouter.snapshot.paramMap.get('id'));
    var flagUrl =  String(this.activatedRouter.snapshot.paramMap.get('flag'))
    localStorage.setItem("flagMaqMus",flagUrl)
    if(localStorage.getItem("idUser") == null){
     this.presentToast("bottom","Debes iniciar sesión para ver el contenido")
     this.router.navigate(["/home"],{state:{pagina:"ejercicios/"+this.criterioEscogido+"/"+flagUrl}})
     }else{
      this.loading(30000).then(response=>{
        response.present();
        switch (localStorage.getItem("flagMaqMus")){
          case "false":
            
            this.api.traerEjerciciosPorMusculo(this.criterioEscogido).then(res=>res.json()).then(res=>{
              this.ejercicios = res.respuesta
              for(let musc of this.ejercicios){
                musc.foto = this.apiUrl+"/imagenes/MiniaturaEjercicios/"+musc.foto
               }
               response.dismiss();
              //console.log(this.ejercicios)
            })
            break;
          case "true":
            this.api.traerEjerciciosPorMaquina(this.criterioEscogido).then(res=>res.json()).then(res=>{
              this.ejercicios = res
              for(let musc of this.ejercicios){
                musc.foto = this.apiUrl+"/imagenes/MiniaturaEjercicios/"+musc.foto
               }
               response.dismiss()
              //console.log(this.ejercicios )
            })
            break;
        }
       })
     }
    //this.filtrarEjercicios(id);
  }

  filtrarEjercicios(id:any){
    var flagEjercicios = [];
    for(let ejer of this.ejercicios){
      if(ejer.idMusculo == id){
        flagEjercicios.push(ejer)
      }
    }
    this.EjerciciosPorMostrar = flagEjercicios;
  }
  
  verDetalle(x:any){
     this.router.navigate(['/ejercicio/'+this.criterioEscogido+"/"+
     String(this.activatedRouter.snapshot.paramMap.get('flag'))+"/"+x._id])
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
      color:"light"
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

  irEjercicio(){
    this.router.navigate(['/ejercicio']);
  }

  ngOnInit() {
  }
  

}
