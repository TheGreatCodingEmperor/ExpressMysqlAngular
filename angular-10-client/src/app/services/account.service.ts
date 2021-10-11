import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import * as jwt_decode from 'jwt-decode';
import { BaseEndpoint } from './base-endpoint.service';

const baseUrl = 'http://localhost:8080/api/tutorials';

export interface AccessToken {
  username: string,
  token: string
}

export interface Token {
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8080/api/accounts';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
  }

  signIn(info: { username: string, password: string }) {
    console.log(info)
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/token`, info, { headers }).pipe(
      map((res: AccessToken) => {
        this.localStorageService.token = res.token;
        this.localStorageService.username = res.username;
        var decoded: Token = jwt_decode.default(res.token);
        this.localStorageService.userId = decoded.userId;
      })
    );
  }
  singUp(info: { username: string, password: string }) {
    return this.http.post(`${this.baseUrl}/signup`, info, {});
  }
}
