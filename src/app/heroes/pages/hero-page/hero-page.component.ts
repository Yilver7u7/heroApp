import { Component, OnInit } from '@angular/core';
import { HerosService } from '../../services/heroes.services';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private herosService: HerosService,
    // Cuando la ruta esta activa permite hacer un subcribe
    private activiteRoute: ActivatedRoute,
    // Con esto si el valor del id del Hero es undefied yo lo regreso a la ventana anterior
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activiteRoute.params
    .pipe(
      // Me permite tomar los params y usarlos
      switchMap( ({ id }) => this.herosService.getHeroById(id)),
    )
    .subscribe( hero => {
      if( !hero ) return this.router.navigateByUrl('heroes/list');
      this.hero = hero;
      return;
    })
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list');
  }


}
