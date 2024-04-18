import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-modificar-noticias',
  templateUrl: './modificar-noticias.component.html',
  styleUrls: ['./modificar-noticias.component.scss'],
})
export class ModificarNoticiasComponent  implements OnInit {

  imagenNueva:any="";
  video:any;
  crearE:boolean=true;

  @Input() info:any;

  @Output() volverPerfil=new EventEmitter<any>()

  noticia=[{id:1,
    titulo:"pug se ha encontrado orinando en el gimnasio ",
    detalle:"en el collar del perro decia su nombre 'maximiliano', se les escapo a unos analistas programadores del duoc uc",
    img:"assets/icon/maxi.jpg"},

    {id:2
    ,titulo:"maxi sube videos a tik tok",
    detalle:"maximiliano urrejola más conocido el adicto a las barras largas(olimpicas)",
    img:"assets/icon/gym.jpg",}]

  constructor(private router: Router) { }

  ngOnInit() {}

  volverM(){
    this.volverPerfil.emit([true,false]);

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

}
