import { Component, OnInit } from '@angular/core';
import { HerosService } from '../../services/heroes.services';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent implements OnInit {

  public searchInput = new FormControl('');
  public heroes: Hero[] =[];
  public selectedHero?: Hero;

  constructor( private herosServices:HerosService) { }

  ngOnInit(): void {

  }

  searchHero(){
    const value: string = this.searchInput.value || '';

    this.herosServices.getSuggestions(value)
    .subscribe(
      heroes => this.heroes = heroes
    );
  }


  onSelectedOption( event: MatAutocompleteSelectedEvent):void{
   if(!event.option.value){
    this.selectedHero = undefined;
   }
   const hero: Hero = event.option.value;
   this.searchInput.setValue( hero.superhero );

   this.selectedHero = hero;
  }



}
