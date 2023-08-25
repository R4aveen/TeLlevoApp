import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pag1',
  templateUrl: './pag1.page.html',
  styleUrls: ['./pag1.page.scss'],
})
export class Pag1Page implements OnInit {

  constructor(
    private alertCtrl:AlertController,
    private router: Router
  ) { }
  
  nombre:string='';
  apellido:string='';
  edad:number=0;

  async grabar(){
    const info = {
      "nombre": this.nombre,
      "apellido": this.apellido,
      "edad": this.edad
    }
    localStorage.setItem("datos",JSON.stringify(info));
    const xxx = await this.alertCtrl.create({
      header:"Grabacion",
      message:"Gravbo los datos"
    });
    xxx.present()
  }
  listar(){
    console.log(this.nombre+"",this.apellido+"",this.edad+"")
  }

  login(){
    this.router.navigate(['inicio']);
  }

  ngOnInit() {
  }

}
