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
  flag:string="";mensajeApp:boolean=false;
  constructor(private activatedRouter:ActivatedRoute,private router:Router,private api:ExpressService,
    private alertController: AlertController) {
   }


  ionViewWillEnter(){
    this.flag = String(this.activatedRouter.snapshot.paramMap.get('flag'))
    var rut = String(this.activatedRouter.snapshot.paramMap.get('rut'))
    var formulario = new FormData()
    formulario.append("rut",rut)
    this.api.rutRepetido(formulario).then(res=>res.json()).then(res=>{
      console.log(res.respuesta[0])
        this.infoUsuario = res.respuesta[0]
    })
  }
  validarUsuario(){
    var formulario = new FormData();
    formulario.append("codigoSeg",String(this.codigoSeg));
    formulario.append("rut",this.infoUsuario.rut)
    this.api.validarUsuario(formulario).then(res=>res.json()).then(res=>{
      if(res.rut){
        if(this.flag == "true"){
          this.presentAlert("Usuario registrado exitosamente. Para iniciar sesión puedes usar tu correo electrónico "+
                            "o tu código de acceso")
          this.router.navigate([""])
        }else{
          this.presentAlert("Usuario registrado exitosamente. Ahora puedes inciar sesión desde tu App móvil,"+
                            " el código de acceso fue enviado a tu correo")
          this.mensajeApp = true;
        }
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
