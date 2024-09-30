import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher } from '../../interfaces/hero.interface';
import { HerosService } from '../../services/heroes.services';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  // Esta es la forma de hacer formularios reactivos
// Maneja las mimsa cosideraciones de la interface
  public heroForm = new FormGroup({
  id:               new FormControl<string>(''),
  superhero:        new FormControl<string>('', { nonNullable: true }), //Esto es un required
  publisher:        new FormControl<Publisher>( Publisher.DCComics),
  alter_ego:        new FormControl(''),
  first_appearance: new FormControl(''),
  characters:       new FormControl(''),
  alt_img:          new FormControl(''),
  });


  public publishers = [
    { id:'DC Comics', value:'DC - Comics'},
    { id:'Marvel Comics ', value:'Marvel - Comics'},
  ]

  constructor( private herosService: HerosService) {}

  

    onSumit(): void {
      console.log( {
        formIsValid: this.heroForm.valid,
        value: this.heroForm.getRawValue()
      })
    }


}
