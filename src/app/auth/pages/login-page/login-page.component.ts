import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  constructor(
    private authService:AuthService,
    private router:Router
   ){}

  onLogion(){
    this.authService.login('fernando@gmail.com', 'fernando').
    subscribe( user => {

      this.router.navigate(['/']);

    } )
  }


}
