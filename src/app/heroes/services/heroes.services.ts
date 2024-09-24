import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
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


}



