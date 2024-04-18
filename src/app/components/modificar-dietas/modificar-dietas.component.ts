import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-modificar-dietas',
  templateUrl: './modificar-dietas.component.html',
  styleUrls: ['./modificar-dietas.component.scss'],
})
export class ModificarDietasComponent  implements OnInit {

  imagenNueva:any="";
  video:any;
  crearE:boolean=true;

  @Input() info:any;

  @Output() volverPerfil=new EventEmitter<any>()

  dietas:any=[{
    img:"assets/icon/dieta1.png",
    nombre:"caloricas",
  },{
    img:"assets/icon/dieta2.png",
    nombre:"sin gluten"
  }]

  constructor(private router: Router) { }

  ngOnInit() {}

  volverM(){
    this.volverPerfil.emit(true);
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

}
