import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.page.html',
  styleUrls: ['./crear-noticia.page.scss'],
})
export class CrearNoticiaPage implements OnInit {

  imagenNueva:any=""
  video:any
  CrearN:boolean=true;
  ModiN:boolean=false;

  noticia=[{id:1,
    titulo:"pug se ha encontrado orinando en el gimnasio ",
    detalle:"en el collar del perro decia su nombre 'maximiliano', se les escapo a unos analistas programadores del duoc uc",
    img:"assets/icon/maxi.jpg"},

    {id:2
    ,titulo:"maxi sube videos a tik tok",
    detalle:"maximiliano urrejola más conocido el adicto a las barras largas(olimpicas)",
    img:"assets/icon/gym.jpg",}]
    
  constructor(private router: Router) { }
  

  ngOnInit() {
  }

  CrearNoticia(){
    this.CrearN=true;
    this.ModiN=false;
  }

  ModificarNoticia(){
    this.ModiN=true;
    this.CrearN=false;
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
