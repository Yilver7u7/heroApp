import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit {

  // Esto es para recibir lo que el componente padre
  // 'list-component le envia a este'
  @Input()
  public hero!: Hero

  ngOnInit(): void {
    if( !this.hero ) throw Error('Hero property is required')
  }

}
