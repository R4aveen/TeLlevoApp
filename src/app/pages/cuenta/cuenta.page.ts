import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  constructor(
    private alertCtrl:AlertController,
    private router: Router
  ) { }

  pag1(){
    this.router.navigate(['home']);
  }
  ngOnInit() {
  }

}
