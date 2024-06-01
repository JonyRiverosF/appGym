import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
})
export class DetalleNoticiaPage implements OnInit {

  comen:any=[]


  noticia:any={};

  boton:boolean=false;

  idNoticia:string="";

  apiUrl:string="";

  subComentario:string="";

  comentario:string="";
 
  infoCreadorComent:any;idComentario:any;mencion:string="";
  usuario:any={}
  constructor(private router: Router, private activatedRouter:ActivatedRoute,private toastController: ToastController,
    private api:ExpressService,private loadingCtrl: LoadingController
  ) {}

  detalleNoticia(){
    this.loading(20000).then(async response=>{
    response.present();
    this.api.detalleNoticia(this.idNoticia).then(res=>res.json()).then(res=>{
      this.noticia = res.noticia;
      this.comen = res.comentarios
      console.log(this.comen)
      this.noticia.foto = this.apiUrl+"imagenes/FotosNoticia/"+this.noticia.foto
      this.noticia.video = this.apiUrl+"videos/"+this.noticia.video
      for(let i=0;i<this.comen.length;i++){
        if(this.comen[i].creadorDelComentario.fotoPerfil != ""){
           this.comen[i].creadorDelComentario.fotoPerfil = this.api.urlApi+"imagenes/fotosPerfil/"+this.comen[i].creadorDelComentario.fotoPerfil
        }
    } 
    this.subComentarios()
    response.dismiss()   
  })
  })
 }
  ionViewWillEnter(){
    this.apiUrl = this.api.urlApi
    this.usuario = JSON.parse(String(localStorage.getItem("idUser")) )
    this.idNoticia = String(this.activatedRouter.snapshot.paramMap.get('id'))
        this.detalleNoticia()
        //console.log(this.noticia 
  }
  
  reportar(nombre:any,comentario:any){
    var formulario = new FormData();
    formulario.append("nombre",nombre);formulario.append("comentario",comentario);
    this.loading(10000).then(response=>{
      response.present();
      this.api.reportar(formulario).then(res=>res.json()).then(res=>{
         this.presentToast("bottom","Reporte realizado exitosamente");
         response.dismiss();
      }).catch(error=>{
        response.dismiss();
        this.presentToast("bottom","Algo salió mal");
        console.log(error)
      })
    })
  }

  esconder(){
    this.boton=true;
    this.presentToast("bottom","Me gusta");
  }

  sacar(){
    this.boton=false;
    this.presentToast("bottom","Me gusta eliminado");
  }



  responder(username:any){
    username.mostrar=true;
    this.subComentario="@"+username.username+" "
  }

  sub(x:any){
    x.mostrar=false;
  }


  loading(duracion:any){
    return this.loadingCtrl.create({
       message: 'Cargando...',
       duration: duracion,
     })
   }

   subComentarios(){
    var cont = 0;
    for(let i=0;i<this.comen.length;i++){
         cont = 0;
         while(cont < this.comen.length){
              if(this.comen[i]._id == this.comen[cont].respuesta.idComentarioPrincipal){
                this.comen[i].subComentarios = true;
                this.comen[i].mostrarSubComent = false;
                cont = this.comen.length
              }else{
                cont++;
              }
         }
    }
    //console.log(this.comentarios)
  }

hola(creadorDelComentario:any,idComentario:any){
  this.mencion = "@"+creadorDelComentario.nombre+" ";
  this.mencion = this.mencion.replace(" ","_");
  this.comentario = "";
  this.comentario = this.mencion
  this.flag = true;this.infoCreadorComent = creadorDelComentario;
  this.idComentario = idComentario
  console.log(idComentario);
}
 
 publicarComentario(){
    var form = new FormData();
    form.append("descripcion",this.comentario);
    form.append("noticia",this.idNoticia);
    form.append("usuarioId",String(this.usuario.rut));
    form.append("usuarioName",this.usuario.nombre+" "+this.usuario.apellido);
    form.append("fotoUsuario",this.usuario.imagen);

    if(this.flag && this.comentario.charAt(0) == "@"){
      form.append("idComentarioPrincipal",this.idComentario);form.append("nombreCreador",this.infoCreadorComent.nombre);
      form.append("idCreador",this.infoCreadorComent.id)
    }else{
      form.append("idComentarioPrincipal","");form.append("nombreCreador","");  
    }
    
    this.loading(60000).then(carga=>{
      carga.present();
      this.api.insertarComentario(form).then(res=>res.json())
      .then(response=>{
        this.detalleNoticia()
        carga.dismiss()
        this.comentario = "";
        console.log(response)
        this.detalleNoticia()

      })

    })
 }
 flag:boolean=false;
 responderSubComentario(idComentario:any,creadorSubComentario:any){
    this.comentario = "";
    this.idComentario = idComentario;this.infoCreadorComent = creadorSubComentario;
    this.comentario = "@"+creadorSubComentario.nombre;
    this.comentario = this.comentario.replace(" ","_");this.comentario+=" ";
    this.flag=true;
 }

 respuestas:boolean=false;
 verRespuestas(x:any){
     x.mostrarSubComent= true;
 }
 ocultarRespuestas(x:any){
  x.mostrarSubComent = false;
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
