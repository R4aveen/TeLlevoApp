import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  constructor(
    private alertCtrl:AlertController,
    private router: Router
  ) { }

  registrar(){
    this.router.navigate(['../inicio']);
  }

  ngOnInit() {
  }

}
