import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-modificar-ejercicios',
  templateUrl: './modificar-ejercicios.component.html',
  styleUrls: ['./modificar-ejercicios.component.scss'],
})
export class ModificarEjerciciosComponent  implements OnInit {

  imagenNueva:any="";
  video:any;
  crearE:boolean=true;

  @Input() info:any;

  @Output() volverPerfil=new EventEmitter<any>()

  ejercicios:any=[{
    id:1,
    nombreEjercicio:"press banca plano",
    img:"assets/icon/aperturas.jpg"
  },{
    id:2,
    nombreEjercicio:"press banca inclinado",
    img:"assets/icon/maxi.jpg"
  }]

  constructor(private router: Router) { }

  ngOnInit() {}


  


  volverM(){
    this.volverPerfil.emit(true);
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
