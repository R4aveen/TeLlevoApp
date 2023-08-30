import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-viaje-modal',
  templateUrl: './detalle-viaje-modal.component.html',
  styleUrls: ['./detalle-viaje-modal.component.scss'],
})
export class DetalleViajeModalComponent {
  @Input() actividad: any;

  constructor(private modalCtrl: ModalController) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  agregarFavorito() {
    this.actividad.favorito = !this.actividad.favorito;
    console.log('Agregar a favoritos:', this.actividad);

    if (this.actividad.favorito) {
      console.log('Se ha añadido a favoritos');
    } else {
      console.log('Se ha removido de favoritos');
    }
  }
}
