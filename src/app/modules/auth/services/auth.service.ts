import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly URL = environment.api
  constructor(private http: HttpClient, private Cookie: CookieService) { }

  sendCredencials(email: string, password: string): Observable<any> {

    const body = {
      email,
      password
    }

    return this.http.post(this.URL + '/auth/login', body)
    .pipe(
      tap((responseOk: any) => {
        const { tokenSession, data } = responseOk
        this.Cookie.set('token_', tokenSession, 4, '/') 
      })
    )
    //console.log(email, password);
  } 
}
