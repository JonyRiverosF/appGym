import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-crear-dieta',
  templateUrl: './crear-dieta.page.html',
  styleUrls: ['./crear-dieta.page.scss'],
})
export class CrearDietaPage implements OnInit {

  crearD:boolean=true;
  modificarD:boolean=false;

  imagenNueva:any=""
  video:any

  dietas:any=[{
    img:"assets/icon/dieta1.png",
    nombre:"caloricas",
  },{
    img:"assets/icon/dieta2.png",
    nombre:"sin gluten"
  }]

  constructor(private router: Router) { }

  ngOnInit() {
  }


  CrearDieta(){
    this.crearD=true;
    this.modificarD=false;
  }

  ModificarDieta(){
    this.modificarD=true;
    this.crearD=false;
  }

  irTipos(){
    this.router.navigate(['/modi-dietas'])
  }






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
