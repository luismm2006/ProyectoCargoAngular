import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { JWTPayload, LoginResponse, User } from '../../interfaces';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = "http://localhost:3000";
  private httpClient = inject(HttpClient);
  private _user = signal<User | null> (null);
  user = this._user.asReadonly();


  constructor(){
    const token = localStorage.getItem("token") || "";
    if(token){
      this.verifyToken()
      .subscribe({
        next : (resp) => {
          const {id, email, name, role} = jwtDecode<JWTPayload>(token);
          this._user.set({id, email, name, role})
        },
        error : (err) => {
          localStorage.removeItem("token");
        }
      })
    }
  }

  verifyToken(){
    return this.httpClient.get(this.URL + "/auth/check-status");
  }


  login(email : string, password : string){
    return this.httpClient.post<LoginResponse>(this.URL + "/auth/login", {email, password})
    .pipe(
      tap(resp => {
        this._user.set(resp.user);
        localStorage.setItem("token", resp.token)
      })
    )
  }

  registrarPiloto(name : string, email : string, password : string){
    return this.httpClient.post(this.URL + "/auth/register", {name, email, password});
  }
}
