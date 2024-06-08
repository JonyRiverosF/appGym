import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-pago-listo',
  templateUrl: './pago-listo.page.html',
  styleUrls: ['./pago-listo.page.scss'],
})
export class PagoListoPage implements OnInit {

  detalle:any={buy_order:"",amount:0,transaction_date:null,status:""};
  constructor(private api:ExpressService,private loadingCtrl: LoadingController) { }
 
  verPago(){
    this.loading(15000).then(response=>{
      response.present()
      this.api.pagoList().then(res=>res.json()).then(res=>{
        this.detalle = res
        console.log(this.detalle)
        response.dismiss();
      })
    })
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
   
  ngOnInit() {
  }

}
