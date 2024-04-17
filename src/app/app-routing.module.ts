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
    path: 'ejercicios',
    loadChildren: () => import('./Pages/ejercicios/ejercicios.module').then( m => m.EjerciciosPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./Pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'ejercicio',
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
    path: 'perfil-admin',
    loadChildren: () => import('./Pages/perfil-admin/perfil-admin.module').then( m => m.PerfilAdminPageModule)
  },
  {
    path: 'registro-user',
    loadChildren: () => import('./Pages/registro-user/registro-user.module').then( m => m.RegistroUserPageModule)
  },
  {
    path: 'crear-noticia',
    loadChildren: () => import('./Pages/crear-noticia/crear-noticia.module').then( m => m.CrearNoticiaPageModule)
  },
  {
    path: 'crear-dieta',
    loadChildren: () => import('./Pages/crear-dieta/crear-dieta.module').then( m => m.CrearDietaPageModule)
  },
  {
    path: 'crear-ejercicio',
    loadChildren: () => import('./Pages/crear-ejercicio/crear-ejercicio.module').then( m => m.CrearEjercicioPageModule)
  },  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
