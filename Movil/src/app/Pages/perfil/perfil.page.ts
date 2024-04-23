import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})


export class PerfilPage implements OnInit {

  prueaP:boolean=false;
  prueaA:boolean=false;

  despliega:boolean=false;
  
  peso:number=140;
  altura:number=1.65;
  
  fecha:Date = new Date();
  fechaActual!:any;
  finMes!:any;

  flag:boolean= false;
  inhabilitarCalen:boolean = false;
  guardarH:boolean=false;
  mostrarHorario:boolean = false;

  horarioSeleccionado!:any;
  horaSeleccionada:string="";

  contador:number = 0;

  resumen:any=[];

  usuario:any;
  constructor(private menuCtrl: MenuController,private router: Router,private toastController: ToastController,
    private activatedRouter:ActivatedRoute
  ) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.["usuario"];
      }
    })
   }

  ionViewDidEnter(){
    this.fechaActual = this.fecha.toISOString();
    //La línea de abajo es para saber el que número es el último día del mes
    if(this.fecha.getDay() != 7){
      const restoSemana = 7 - this.fecha.getDay()
      console.log(this.fecha.getDay() +"---"+this.fecha.getDate())
      var finSemana = this.fecha.getDate()+restoSemana
      var fecha = new Date(this.fecha.getFullYear(),this.fecha.getMonth(),finSemana)
      this.finMes = fecha.toISOString()
    }else{
      var fecha = new Date(this.fecha.getFullYear(),this.fecha.getMonth(),this.fecha.getDate()+7)
      this.finMes = fecha.toISOString()
    }
 
  }

  nya(x:any){

    try{
      if(this.horarioSeleccionado.length > 3){
        this.horarioSeleccionado.pop();
        this.horarioSeleccionado = this.horarioSeleccionado.slice()
        this.presentToast("bottom","Solo se pueden escoger 3 días")
      }else{
        if(this.contador <= this.horarioSeleccionado.length){
          this.flag = true;
          this.inhabilitarCalen = true;
        }else{
          console.log(this.resumen)
          for(let elegido of this.resumen){
            var flag = true;
            for(let horarios of this.horarioSeleccionado){
              var flagDate = new Date(horarios)
              if(elegido.dia == flagDate.toLocaleString("es-ES",{month:"long",year:"numeric",day:"numeric",weekday:"short",timeZone:"UTC"})){
                flag = false
              }
            }
            if(flag){
              console.log(elegido)
              const ind = this.resumen.indexOf(elegido)
              this.resumen.splice(ind,1)
              console.log(ind)
            }
          }
        }
        console.log(this.horarioSeleccionado)
        x.detail.value = this.horarioSeleccionado.slice()         
        this.contador = this.horarioSeleccionado.length 
      }     
    }catch(e:any){
        console.log(e.message);
        this.resumen = []
    }
  }

 elegirHora(){
   if(this.horaSeleccionada != ""){
     this.flag=false;
     this.inhabilitarCalen = false;
     if(this.horarioSeleccionado.length <= 3){
       this.resumenEleccion(this.horaSeleccionada)
       this.horaSeleccionada = "";
       if(this.resumen.length == 3){
         this.inhabilitarCalen = true;
         this.guardarH = true;
       }
       console.log(this.resumen)
     }
   }else{
    this.presentToast("bottom","Debe seleccionar una hora")
   }
    console.log(this.horaSeleccionada)
 }
  cancelar(){
    this.flag = false;
    this.inhabilitarCalen = false;
    this.horarioSeleccionado.pop();
    this.horarioSeleccionado = this.horarioSeleccionado.slice()
    this.horaSeleccionada = ""
    console.log(this.horarioSeleccionado)
  }

  seguirEligiendo(){
    this.inhabilitarCalen=false;this.flag = false
    this.guardarH= false;
  }

 resumenEleccion(hora:any){
    let bandera = new Date(this.horarioSeleccionado[this.horarioSeleccionado.length - 1]);
    this.resumen.push({
      dia:bandera.toLocaleString("es-ES",{month:"long",year:"numeric",day:"numeric",weekday:"short",timeZone:"UTC"}),
      hora,
      fechaOriginal:bandera
    })
 }
 guardarHorario(){
   this.resumen.sort((a:any,b:any)=>{
     let fechaU = new Date(a.fechaOriginal);
     let fechaD = new Date(b.fechaOriginal);
     if(fechaU < fechaD){
      return -1
     }else{
      return 1
     }
   })
   this.mostrarHorario = false
 }
 isWeekday = (dateString: string) => {
  const date = new Date(dateString);
  const utcDay = date.getUTCDay();

  /**
   * Date will be enabled if it is not
   * Sunday or Saturday
   */
  return utcDay !== 0;
};
 mostrarH(){
  this.mostrarHorario = true;
 }
 esconderH(){
  this.mostrarHorario = false;
 }
  modificarP(){
    this.prueaP=true;
  }

  guardarP(){
    this.prueaP=false;
  }

  modificarA(){
    this.prueaA=true;
  }

  guardarA(){
    this.prueaA=false;
  }

  despliegaC(){
    this.despliega=true;
  }

  ocultarV(){
    this.despliega=false;
  }

  abrirMenu(){
    this.menuCtrl.enable(true, 'menuEnd');
    this.menuCtrl.open('menuEnd');
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
      color:"light"
    });

    await toast.present();
  }
  
  
  ngOnInit() {
  }

}
