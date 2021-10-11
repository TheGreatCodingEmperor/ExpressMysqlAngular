import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BaseEndpoint {
  constructor(
    private localStorageService:LocalStorageService
  ) { 
  }
  get headers(){
    let httpHeaders:HttpHeaders = new HttpHeaders();
    let token = this.localStorageService.token;
    httpHeaders = httpHeaders.append("Authorization",token?`Bearer ${token}`:null);
    return httpHeaders;
  }
}
