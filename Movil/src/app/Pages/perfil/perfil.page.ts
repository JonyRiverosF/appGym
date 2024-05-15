import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

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
  horaSeleccionada:any={};
  horarioPorEnviar:any=[]
  contador:number = 0;

  resumen:any=[];
  horarios:any;
  horasPorElegir:any=[];

  usuario:any={};
  fichaMedica:string="";
  apiUrl:string = ""
  constructor(private menuCtrl: MenuController,private router: Router,private toastController: ToastController,
    private activatedRouter:ActivatedRoute,private api:ExpressService, private loadingCtrl: LoadingController
  ) {}

  ionViewDidEnter(){
    this.apiUrl = this.api.urlApi
    try{
      this.fechaActual = this.fecha.toISOString();
      const finDeMEs = new Date(this.fecha.getFullYear(),this.fecha.getMonth(),0)
      if(finDeMEs.getDate()-this.fecha.getDate() <3){
        this.finMes = new Date(this.fecha.getFullYear(),this.fecha.getMonth()+1,7-(finDeMEs.getDate()-this.fecha.getDate())).toISOString()
      }else{
        //La línea de abajo es para saber el que número es el último día del mes
        if(this.fecha.getDay() != 0){
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
    }catch(e){
      console.log(e)
    }
  }

  ionViewWillEnter(){
    this.usuario = JSON.parse(String(localStorage.getItem("idUser")))
    this.fichaMedica = this.apiUrl+"fichasMedicas/"+this.usuario.fichaMedica
    var formulario = new FormData()
    formulario.append("rut",String(this.usuario.rut))
    this.loading(30000).then(response=>{
      response.present();

      this.api.traerHorarios().then(res=>res.json()).then(async horarios=>{
        this.horarios = horarios.respuesta
        //console.log(this.horarios)
        await this.api.actualizarHorario(this.usuario.rut).then(res=>res.json()).then(res=>{
          console.log(res)
        })
        await this.api.horariosTomados(formulario).then(res=>res.json()).then(tomados=>{
          var dias = []
          if(tomados.resp.length>0){
            for(let x of tomados.resp[0].horarios){
              dias.push(x.fecha)
            }
            //console.log(dias)
            this.horarioSeleccionado = dias
            for(let x of tomados.resp[0].horarios){
              this.resumen.push({
                dia:new Date(x.fecha).toLocaleString("es-ES",{month:"long",year:"numeric",day:"numeric",weekday:"short",timeZone:"UTC"}),
                hora:x.hora,
                fechaOriginal:x.fecha
              })
            }
            this.inhabilitarCalen=true;this.flag=false;this.guardarH=false;this.contador=this.horarioSeleccionado.length
            //console.log(this.resumen)
          }else{
            this.horarioSeleccionado=undefined
          }
          response.dismiss()
        })
      })
    })

  }
  nya(x:any){
    
    try{
      this.horasPorElegir = []
      if(this.horarioSeleccionado.length > 3){
        this.horarioSeleccionado.pop();
        this.horarioSeleccionado = this.horarioSeleccionado.slice()
        this.presentToast("bottom","Solo se pueden escoger 3 días")
      }else{
        if(this.contador <= this.horarioSeleccionado.length){
          this.flag = true;
          this.inhabilitarCalen = true;
          var diaPorRevisar= new Date(this.horarioSeleccionado[this.horarioSeleccionado.length-1])
          diaPorRevisar = new Date(diaPorRevisar.getFullYear(),diaPorRevisar.getMonth(),diaPorRevisar.getDate()+1)
          //console.log(this.horarioSeleccionado[this.horarioSeleccionado.length-1])
          console.log(this.horarios)
         // console.log(diaPorRevisar)
          for(let horarios of this.horarios){
           if(new Date(horarios.fecha).getDay() == diaPorRevisar.getDay()){
                this.horasPorElegir.push(horarios)
            }
          }
         // console.log(this.horasPorElegir)
        }else{
          //console.log(this.resumen)
          for(let elegido of this.resumen){
            var flag = true;
            for(let horarios of this.horarioSeleccionado){
              var flagDate = new Date(horarios)
              if(elegido.dia == flagDate.toLocaleString("es-ES",{month:"long",year:"numeric",day:"numeric",weekday:"short",timeZone:"UTC"})){
                flag = false
              }
            }
            if(flag){
             // console.log(elegido)
              const ind = this.resumen.indexOf(elegido)
              this.resumen.splice(ind,1)
             // console.log(ind)
            }
          }
        }
       // console.log(this.horarioSeleccionado)
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
       this.resumenEleccion(this.horaSeleccionada.hora)
       this.horarioPorEnviar.push({hora:this.horaSeleccionada,dia:this.horasPorElegir[0]})
       if(this.resumen.length == 3){
         this.inhabilitarCalen = true;
         this.guardarH = true;
       }
       //console.log(this.resumen)
     }
   }else{
    this.presentToast("bottom","Debe seleccionar una hora")
   }
  //  console.log(this.horaSeleccionada)
 }
  cancelar(){
    this.flag = false;
    this.inhabilitarCalen = false;
    this.horarioSeleccionado.pop();
    this.horarioSeleccionado = this.horarioSeleccionado.slice()
   // console.log(this.horarioSeleccionado)
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
  console.log(this.horarioPorEnviar)
  var formulario = new FormData();
  formulario.append("horarioUno",JSON.stringify(this.horarioPorEnviar[0]))
  formulario.append("horarioDos",JSON.stringify(this.horarioPorEnviar[1]))
  formulario.append("horarioTres",JSON.stringify(this.horarioPorEnviar[2]))
  formulario.append("rut",this.usuario.rut)
  this.api.guardarHorario(formulario).then(res=>res.json()).then(respuesta=>{
    console.log(respuesta)
  })
   /*this.resumen.sort((a:any,b:any)=>{
     let fechaU = new Date(a.fechaOriginal);
     let fechaD = new Date(b.fechaOriginal);
     if(fechaU < fechaD){
      return -1
     }else{
      return 1
     }
   })*/
   this.mostrarHorario = false
 }

 ionViewDidLeave(){
  this.resumen=[]
  this.flag=false;
  this.inhabilitarCalen = false;
  this.horarioSeleccionado=[];this.horarioPorEnviar=[];
  this.mostrarHorario=false;
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

loading(duracion:any){
  return this.loadingCtrl.create({
     message: 'Cargando...',
     duration: duracion,
   })
 }
 

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
   
  contactanos(){
     this.router.navigate(["/contactanos"])
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
