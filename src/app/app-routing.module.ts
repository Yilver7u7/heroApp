import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanMatch } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';


// Dominio por defecto donde ingresan es un path basio
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canMatch: [PublicGuard],
    canActivate: [PublicGuard]
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canMatch: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  // Cuando la ruta esta vacia redirige al home deseado
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full' //Para evitar problemas de espaciado en las rutas
  },
  // Cuando se escribe cualuier otro path que sea desconocido redirrige al 404
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
