import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Asegúrate de importar NavController

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
    // Agrega aquí la lógica para iniciar un nuevo viaje
    // Por ejemplo, puedes navegar a una nueva página usando navCtrl
    // this.navCtrl.navigateForward('ruta-de-tu-pagina'); // Ejemplo de navegación
  }
}
