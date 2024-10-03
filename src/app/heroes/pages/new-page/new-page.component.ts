import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HerosService } from '../../services/heroes.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

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

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private herosService: HerosService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  //Esto basicamente convierte los valores que tenemos en nuestro
  //Formulario en algo lo mas cercano a un objeto que cumpla con los requisitos
  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;

    return hero

  }

  onSumit(): void {
     if( this.heroForm.invalid) return;

     //Este es para el caso en que el ID lo esten creando
     if( this.currentHero.id ){
      this.herosService.updateHero( this.currentHero )
      .subscribe( hero => {
        this.showSnackbar(`${hero.superhero} updated!`)
      });
      return
     }

     //Este es para el caso en que el ID lo envia la base de datos
     this.herosService.addHero( this.currentHero )
     .subscribe( hero => {
        // TODO: Mostrar mensaje se creo correctamente
        this.router.navigate([`/heroes/edit`, hero.id])
        this.showSnackbar(`${hero.superhero} created!`)
      });

  }

  onDeleteHero(){
    if( !this.currentHero.id ) throw Error('Hero id is requierd');

    const dialogRef = this.dialog.open(  ConfirmDialogComponent,{
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      // Filtro mediante los pipes de RXJS
      // Con esto nos aseguramos que la confirmacion de eliminacion
      // SI es deseada por el usaurio
      filter( (result: boolean) =>  result),
      // Una vez confirmada la validacion disparamos la consulta
      switchMap( () => this.herosService.deleteHeroById(this.currentHero.id)),
      // Validamos el resultado para saber si ya fue eliminado anteriormente
      filter( (wasDeleted:boolean) => wasDeleted),
    )
    //Al detectar que si fue eliminado, pues regresa al usuario a la lista
    .subscribe(result => {
      this.router.navigate(['/heroes']);
    })

    // Esto es para cuando el usuario confirma el dialogo
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   console.log({result});

    //   this.herosService.deleteHeroById(this.currentHero.id)
    //   .subscribe(
    //     result => {
    //       if( result )
    //         this.router.navigateByUrl('/heroes');
    //     }
    //   );
    // })


  }


  showSnackbar( message: string ):void{
    this.snackbar.open( message, 'DONE', {
      duration: 2000
    })
  }


  ngOnInit(): void {

    // Si en el router se incluye la url que idica editar editamos personajes existentes
    // Esto hace mas reutilizable el mismo formulario mediante el enrutado
    if( !this.router.url.includes( 'edit' ) ) return
    this.ActivatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.herosService.getHeroById( id)),
    ).subscribe( hero => {
      // SI no EXISTE el hero porque no encontro un ID que lo relacione con la
      //base de datos lo regresa al listado
      if(!hero ) return this.router.navigateByUrl('/');
      //Por el contrario si encuentra que el objeto si exite
      //Entonces toma los valores de este para completar los campos existentes
      this.heroForm.reset( hero );
      return;
    });
  }

}
