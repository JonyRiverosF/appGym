import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-crear-ejercicio',
  templateUrl: './crear-ejercicio.page.html',
  styleUrls: ['./crear-ejercicio.page.scss'],
})
export class CrearEjercicioPage implements OnInit {

  imagenNueva:any=""
  video:any
  crearE:boolean=true;
  modiE:boolean=false;

  musculos:any=[{
    id:1,
    nombreMusculo:"pecho",
    img:"assets/icon/pecho.jpg"
  },{
    id:2,
    nombreMusculo:"triceps",
    img:"assets/icon/maxi.jpg"
  }]


  constructor(private router: Router) { }

  ngOnInit() {
  }





  irModificar(){
    this.router.navigate(['/modificar-ejercicio'])
  }




  

  CrearEjercicio(){
    this.crearE=true;
    this.modiE=false;
  }

  ModificarEjercicio(){
    this.modiE=true;
    this.crearE=false;
  }

  onFileSelectede(event:any) {
    console.log("Aqui estoy ")

    this.video =(window.URL||window.webkitURL).createObjectURL(event.target.files[0]);}
    //console.log(this.video)

  takePicture = async () => {
    const image2 = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source:CameraSource.Photos
    });
    this.imagenNueva= image2.dataUrl;
  };
  
  irPerfil(){
    this.router.navigate(['/perfil-admin']);
  }

  RegistroU(){
    this.router.navigate(['/registro-user']);
  }

  irDietas(){
    this.router.navigate(['/crear-dieta']);
  }

  irMusculos(){
    this.router.navigate(['/crear-ejercicio']);
  }

  irNoticias(){
    this.router.navigate(['/crear-noticia']);
  }

}
