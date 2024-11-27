import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080/login'

  private _token: string | undefined;

  private _user: any = {
    isAuth: false,
    isAdmin: false,
    user: undefined
    
  }
  constructor(private http: HttpClient) { }

  loginUser({username,password}: any): Observable<any>{
    return this.http.post<any>(this.url, {username,password})
  }

  set user(user: any){
    this._user = user;
    sessionStorage.setItem("login", JSON.stringify(user));
  }

  get user(){
    if(this._user.isAuth ){
      return this._user;
    }else if(sessionStorage.getItem('login') != null){
      this._user =  JSON.parse(sessionStorage.getItem('login') || '{}') 
      return this._user
    }
    return this._user;
  }
  get token(){
    if(this._token != undefined){
      return this._token;
    }else if(sessionStorage.getItem('token')){
      this._token = sessionStorage.getItem('token') || ''
      return this._token
    }
    return this._token!;
  }

  set token(token: string){
    this._token = token;
    sessionStorage.setItem("token", token)
  }

  getPayload(token: string){
    if(token != null){
      return JSON.parse(atob(token.split(".")[1]))
    }
    return null;
  }

  isAdmin(){
    return this.user.isAdmin || false
  }

  isAuthenticated(){
    return this.user.isAuth || false
  } 
  logout(){
    this._token = undefined
    this._user = {
      isAuth: false,
      isAdmin: false,
      user: undefined
      
    }
    sessionStorage.removeItem('login')
    sessionStorage.removeItem('token')
  }




}