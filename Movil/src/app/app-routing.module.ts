import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'guardados',
    loadChildren: () => import('./Pages/guardados/guardados.module').then( m => m.GuardadosPageModule)
  },
  {
    path: 'dietas',
    loadChildren: () => import('./Pages/dietas/dietas.module').then( m => m.DietasPageModule)
  },
  {
    path: 'ejercicios/:id/:flag',
    loadChildren: () => import('./Pages/ejercicios/ejercicios.module').then( m => m.EjerciciosPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./Pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'ejercicio/:musculo/:flag/:id',
    loadChildren: () => import('./Pages/ejercicio/ejercicio.module').then( m => m.EjercicioPageModule)
  },
  {
    path: 'musculos',
    loadChildren: () => import('./Pages/musculos/musculos.module').then( m => m.MusculosPageModule)
  },
  {
    path: 'tipo-dietas/:tipoDieta',
    loadChildren: () => import('./Pages/tipo-dietas/tipo-dietas.module').then( m => m.TipoDietasPageModule)
  },
  {
    path: 'dieta/:tipoDieta/:id',
    loadChildren: () => import('./Pages/dieta/dieta.module').then( m => m.DietaPageModule)
  },
  {
    path: 'detalle-noticia/:id',
    loadChildren: () => import('./Pages/detalle-noticia/detalle-noticia.module').then( m => m.DetalleNoticiaPageModule)
  },

  {
    path: 'recuperar',
    loadChildren: () => import('./Pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./Pages/registro-user/registro-user.module').then( m => m.RegistroUserPageModule)
  },
  {
    path: 'confirmar-registro/:rut',
    loadChildren: () => import('./Pages/confirmar-registro/confirmar-registro.module').then( m => m.ConfirmarRegistroPageModule)
  },
  {
    path: 'contactanos',
    loadChildren: () => import('./Pages/contactanos/contactanos.module').then( m => m.ContactanosPageModule)
  },
  {
    path: 'check-in',
    loadChildren: () => import('./Pages/check-in/check-in.module').then( m => m.CheckInPageModule)
  },
  {
    path: 'check-out',
    loadChildren: () => import('./Pages/check-out/check-out.module').then( m => m.CheckOutPageModule)
  },  {
    path: 'sobre-nosotros',
    loadChildren: () => import('./pages/sobre-nosotros/sobre-nosotros.module').then( m => m.SobreNosotrosPageModule)
  },
  {
    path: 'pago-listo',
    loadChildren: () => import('./Pages/pago-listo/pago-listo.module').then( m => m.PagoListoPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
