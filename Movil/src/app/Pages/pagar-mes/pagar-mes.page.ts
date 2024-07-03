import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpressService } from 'src/app/services/express.service';

@Component({
  selector: 'app-pagar-mes',
  templateUrl: './pagar-mes.page.html',
  styleUrls: ['./pagar-mes.page.scss'],
})
export class PagarMesPage implements OnInit {
  act:any;
  token:any;
  constructor( private activatedRouter:ActivatedRoute,private api:ExpressService) { }

  ngOnInit() {
    this.subscribe()
  }

  subscribe(){
    var form = new FormData();
    form.append("id",String(this.activatedRouter.snapshot.paramMap.get('id')));
    this.api.subscribe(form).then(res=>res.json()).then(resi=>{
      console.log(resi)
      this.act = resi.resi.url
      this.token = resi.resi.token
      //window.location.href=resi.ur
    })
    
}
}
