import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Asegúrate de importar NavController
import Swiper from 'swiper';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  hayUltimosViajes: boolean = false; // Cambia según tus necesidades

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  iniciarViaje() {
    console.log("Iniciando un nuevo viaje");
    // Agrega aquí el código para iniciar un nuevo viaje si es necesario
  }

  ionViewDidEnter() {
    const mySwiper = new Swiper('.swiper-container', {
      initialSlide: 2, // Inicia en el medio (índice 2)
      autoplay: {
        delay: 3000, // Tiempo en milisegundos entre diapositivas
        disableOnInteraction: false, // Permite que el movimiento automático continúe incluso si el usuario interactúa
      },
      loop: true, // Activa el looping
      navigation: {
        nextEl: '.swiper-button-next', // Clase del botón "Siguiente"
        prevEl: '.swiper-button-prev', // Clase del botón "Anterior"
      },
    });
  }
}
