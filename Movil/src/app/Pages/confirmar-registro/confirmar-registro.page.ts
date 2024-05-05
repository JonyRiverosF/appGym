import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-confirmar-registro',
  templateUrl: './confirmar-registro.page.html',
  styleUrls: ['./confirmar-registro.page.scss'],
})
export class ConfirmarRegistroPage implements OnInit {
 
  infoUsuario:any={};codigoSeg!:number;
  constructor(private activatedRouter:ActivatedRoute,private router:Router,private api:ExpressService,
    private alertController: AlertController
  ) {
    this.activatedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
          this.infoUsuario = this.router.getCurrentNavigation()?.extras.state?.["infoUsuario"]
          console.log(this.infoUsuario)
      }
    })
   }

  validarUsuario(){
    var formulario = new FormData();
    formulario.append("codigoSeg",String(this.codigoSeg));
    formulario.append("rut",this.infoUsuario.rut)
    this.api.validarUsuario(formulario).then(res=>res.json()).then(res=>{
      if(res.rut){
        this.presentAlert("Usuario registrado exitosamente. Para iniciar sesión puedes usar tu correo electrónico "+
                          "o tu código de acceso")
        this.router.navigate([""])
      }else{
        this.presentAlert("Código de seguridad incorrecto")
      }
    })
  }


  async presentAlert(mensaje:string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Seguridad de la contraseña',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
