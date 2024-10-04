import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems = [
    {lable: 'Listado', icon: 'label', url:'./list'},
    {lable: 'Añadir', icon: 'add', url:'./new-hero'},
    {lable: 'Buscar', icon: 'search', url:'./search'}
  ]

  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  get user(): User | undefined{
    return this.authService.getCurrentUser();
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }


}
