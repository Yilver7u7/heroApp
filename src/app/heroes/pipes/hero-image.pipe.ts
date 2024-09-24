import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  // Recibir un heroe y regresar un url de cada uno
  transform( hero: Hero ): string {

    if ( !hero.id && !hero.alt_img ) {
      return 'assets/no-image.png';
    }

    if ( hero.alt_img ) return hero.alt_img; // https:///google.com/flash.jpg

    return `assets/heroes/${ hero.id }.jpg`;

  }

}
