import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { RouterModule, Routes } from '@angular/router';
import { ActividadPage } from './actividad.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule, // Add IonicModule to imports
    RouterModule.forChild(routes)
  ],
  declarations: [ActividadPage]
})
export class ActividadPageModule {}
