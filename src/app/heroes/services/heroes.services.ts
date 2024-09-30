import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HerosService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  // En point HttpClient
  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById( id: string ): Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    // I consider this is a try catch buy with Observable in TS
    .pipe(
      catchError( error => of(undefined) )
    );
  }

  getSuggestions( query: string ): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }

  // La data se manda como segundo argumento
  addHero( hero: Hero ): Observable<Hero>{
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero)
  }

  // Solo actualiza los datos que vienen del objeto
  updateHero( hero: Hero ): Observable<Hero>{
    if( !hero.id ) throw Error("Hero is required");
    // Se manda el Id para encontrar el objero y luego los
    // datos o parametros que se van a actualizar
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes`, hero)
  }

  // En estos casos retornamos un booleano para asegurarnos
  // que el valor haya sido eliminado correctamente
  deleteHeroById ( id: string): Observable<boolean>{

    return this.http.delete(`${ this.baseUrl }/heroes`)
    .pipe(
      // Si la consulta sale mal regresara un false
      catchError( err => of ( false ) ),
      // Si por el contrario llega hasta este punto devuelve un true
      map( resp => true)
    )
  }




}



