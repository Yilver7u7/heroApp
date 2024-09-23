import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HerosService } from '../../services/heroes.services';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {


  public heroes: Hero[] = [];

  constructor( private herosService: HerosService){}



  ngOnInit(): void {
    this.herosService.getHeroes()
    .subscribe(heroes => {
      this.heroes = heroes;
    })
  }

}
