import { Component } from '@angular/core';

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


}
