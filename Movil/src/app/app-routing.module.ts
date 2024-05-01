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
    path: 'ejercicios/:id',
    loadChildren: () => import('./Pages/ejercicios/ejercicios.module').then( m => m.EjerciciosPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./Pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'ejercicio/:musculo/:id',
    loadChildren: () => import('./Pages/ejercicio/ejercicio.module').then( m => m.EjercicioPageModule)
  },
  {
    path: 'musculos',
    loadChildren: () => import('./Pages/musculos/musculos.module').then( m => m.MusculosPageModule)
  },
  {
    path: 'tipo-dietas',
    loadChildren: () => import('./Pages/tipo-dietas/tipo-dietas.module').then( m => m.TipoDietasPageModule)
  },
  {
    path: 'dieta',
    loadChildren: () => import('./Pages/dieta/dieta.module').then( m => m.DietaPageModule)
  },
  {
    path: 'detalle-noticia',
    loadChildren: () => import('./Pages/detalle-noticia/detalle-noticia.module').then( m => m.DetalleNoticiaPageModule)
  },

  {
    path: 'recuperar',
    loadChildren: () => import('./Pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./Pages/registro-user/registro-user.module').then( m => m.RegistroUserPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
