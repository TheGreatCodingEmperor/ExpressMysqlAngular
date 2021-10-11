import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly _token = "token";
  private readonly _username = "username";
  private readonly _userId = "userId";

  constructor() { }

  get token(){
    return localStorage.getItem(this._token);
  }
  set token(text:string){
    localStorage.setItem(this._token,text);
  }

  get username(){
    return localStorage.getItem(this._username);
  }
  set username(text:string){
    localStorage.setItem(this._username,text);
  }

  get userId(){
    return localStorage.getItem(this._userId);
  }
  set userId(text:string){
    localStorage.setItem(this._userId,text);
  }
}
