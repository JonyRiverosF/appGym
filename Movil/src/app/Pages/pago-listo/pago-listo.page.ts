import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-pago-listo',
  templateUrl: './pago-listo.page.html',
  styleUrls: ['./pago-listo.page.scss'],
})
export class PagoListoPage implements OnInit {

  detalle:any;
  usuario:any;
  constructor(private api:ExpressService,private loadingCtrl: LoadingController,private router:Router) { }
 
  verPago(){
    this.usuario = JSON.parse(String(localStorage.getItem("idUser")))
    this.loading(15000).then(response=>{
      response.present();
      var form = new FormData();
      form.append("rut",this.usuario.rut);
      form.append("nombre",this.usuario.nombre+" "+this.usuario.apellido)
      this.api.pagoList(form).then(res=>res.json()).then(res=>{
        this.detalle = res.tok.respuesta
        console.log(res)
        console.log(this.detalle)
        this.detalle.hora =  new  Date(this.detalle.transaction_date).toLocaleString("es-ES",{hour:"2-digit",minute:"2-digit"})
        this.detalle.transaction_date = new  Date(this.detalle.transaction_date).toLocaleString("es-ES",{month:"long",year:"numeric",day:"numeric",weekday:"long"})
        this.detalle.payment_type_code = this.formatoTarjeta(this.detalle);
        this.detalle.status = this.formatoEstado(this.detalle);
        this.detalle.amount = this.detalle.amount.toLocaleString("es")
        
        if(!res.tok.token){
          this.detalle.status = "Compra anulada por el cliente"
        }else{
          this.refrescarUsuario(res.respuesta)
        }
        response.dismiss();
      })
    })
  }

  refrescarUsuario(user:any){
      localStorage.clear();
      localStorage.setItem("idUser",JSON.stringify(user));
  }
  formatoTarjeta(x:any){
    switch(x.payment_type_code){
      case "VD":
        x.payment_type_code = "DÉBITO";break;
      case "VP":
        x.payment_type_code = "PREPAGO";break;
      case "VN":
        x.payment_type_code = "CRËDITO SIN CUOTAS";break;
    }
    return x.payment_type_code
  }

  formatoEstado(x:any){
    switch(x.status){
      case "AUTHORIZED":
        x.status = "Pago exitoso";break;
      case "FAILED":
        x.status = "Pago rechazado";break;
    }
    return x.status
  }


  ionViewWillEnter(){
    this.verPago()
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
   
  ngOnInit() {
  }

}
