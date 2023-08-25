import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablasPage } from './tablas.page';

const routes: Routes = [
  {
    path: 'inicio',
    component: TablasPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'registrar',
        loadChildren: () => import('../../login/registrar/registrar.module').then( m => m.RegistrarPageModule)
      },
      {
        path: 'actividad',
        loadChildren: () => import('../actividad/actividad.module').then( m => m.ActividadPageModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('../configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('../cuenta/cuenta.module').then( m => m.CuentaPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablasPageRoutingModule {}
