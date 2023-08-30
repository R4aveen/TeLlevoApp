import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleViajeModalComponent } from './modals/detalle-viaje-modal/detalle-viaje-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage {
  actividades = [
    { descripcion: 'Viaje a la playa', favorito: false },
    { descripcion: 'Comida en restaurante', favorito: true },
    // Agrega más actividades según sea necesario
  ];

  constructor(private modalCtrl: ModalController, private router: Router) {}

  async verDetalle(actividad: any) {
    const modal = await this.modalCtrl.create({
      component: DetalleViajeModalComponent,
      componentProps: {
        actividad: actividad,
      },
    });
    return await modal.present();
  }

  agregarFavorito(actividad: any) {
    actividad.favorito = !actividad.favorito;
    console.log('Agregar a favoritos:', actividad);
  }

  irACuenta() {
    this.router.navigate(['cuenta']);
  }
}
