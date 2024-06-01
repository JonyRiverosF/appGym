import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ExpressService } from '../services/express.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //formulario
  codigo:string="";
  msj:string="";
  correo:string="";
  validado:boolean=true;

  //flag
  codigoEncontrado:boolean=false;
  redirigir:any;
  constructor(private router: Router,private api:ExpressService, private loadingCtrl: LoadingController,
    private toastController: ToastController,private activatedRouter:ActivatedRoute) {
     try{
       this.activatedRouter.queryParams.subscribe(param =>{
         if (this.router.getCurrentNavigation()?.extras.state){
           this.redirigir = this.router.getCurrentNavigation()?.extras?.state?.["pagina"];
         }
       })
     }catch(e:any){
      console.log("Algo salió mal");console.log(e)
     }
    }   
  ionViewWillEnter(){
    if(!this.redirigir){
      localStorage.clear()
    }else{
      localStorage.removeItem("idUser");
    }
  }
  
  irRecuperar(){
    this.router.navigate(['/recuperar'])
    
  }

  codigoVerificado(){
  
    var irLogin = new FormData();
    irLogin.append("codigo",String(this.codigo));irLogin.append("correo",this.correo)
    this.loading(60000).then(response=>{
      response.present();
      this.api.login(irLogin).then(res=>res.json()).then(json=>{
        console.log(json)
        response.dismiss()
        if(json.usuario.length >0){
          if(json.usuario[0].estado == "registrado"){
            localStorage.setItem("idUser",JSON.stringify(json.usuario[0]))
            if(this.redirigir){
              this.router.navigate(["/"+this.redirigir])
            }else{
              this.router.navigate(['/perfil'])
            }
            this.codigo = "";this.correo="";
          }else{
            this.presentToast("bottom","Usuario no puede iniciar sesión, comuníquese con el gimnasio para más detalles",3500)
          }
        }else{
          
          this.presentToast("bottom","Credenciales incorrectas, revise bien su correo o código",2500)
        }
      })
    })
    
  }

  loading(duracion:any){
    return this.loadingCtrl.create({
       message: 'Cargando...',
       duration: duracion,
     })
   }
   
  async presentToast(position: 'top' | 'middle' | 'bottom',mensaje:string,duracion:number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion,
      position: position,
      color:"dark"
    });

    await toast.present();
  }
}
