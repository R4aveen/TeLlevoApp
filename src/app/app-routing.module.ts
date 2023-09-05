import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TablassComponent } from './pages/tablass/tablass.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'pag1',
    loadChildren: () => import('./login/pag1/pag1.module').then( m => m.Pag1PageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./login/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'actividad',
    loadChildren: () => import('./pages/actividad/actividad.module').then( m => m.ActividadPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./login/admin/admin.module').then( m => m.AdminPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: TablassComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'inicio',
          },
          {
            path: 'inicio',
            loadChildren: () => import('./pages/inicio/inicio.module').then((m) => m.InicioPageModule),
          },
          {
            path: 'actividad',
            loadChildren: () => import('./pages/actividad/actividad.module').then((m) => m.ActividadPageModule),
          },
          {
            path: 'configuracion',
            loadChildren: () => import('./pages/configuracion/configuracion.module').then((m) => m.ConfiguracionPageModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
