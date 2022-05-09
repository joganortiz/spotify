import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(private asAuthServices: AuthService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
    });
  }

  sendLogin(): void {
    const {email, password} = this.formLogin.value
    //console.log(body)
    this.asAuthServices.sendCredencials(email, password )
    //TODO: status 200 < 400
    .subscribe(responseOk =>{ //TODO: cuando el usuario es correcto
      this.router.navigate(['/', 'tracks'])
      console.log("inicio correcta", responseOk)
    }, error => { //TODO: status 400 >=
      this.errorSession = true
      console.log("correo o contraseña son incorrecta")
    })
  }

}
