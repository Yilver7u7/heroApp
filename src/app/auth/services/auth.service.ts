import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  getCurrentUser(): User| undefined {
    if( !this.user) return undefined;

    // De esta forma devuelve un clon mediante el strutureClone JS
    return structuredClone( this.user );//Node V17

    // De esta forma devuelve un clon del valor mediante el operador spread
    // return {...this.user};
  }

  login( email: string, password: string):Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap( user =>  this.user = user ),
      tap( user => localStorage.setItem('token', 'Yilverwashere' ))
    );
  }
    //Usualmente se manda una consulta post para verificar
    // Que es usuario se encuentre en la base de datos

  logout(){
    this.user = undefined;
    localStorage.clear();
  }


}




