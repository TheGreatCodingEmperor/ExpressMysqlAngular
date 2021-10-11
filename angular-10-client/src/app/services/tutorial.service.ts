import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndpoint } from './base-endpoint.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TutorialService extends BaseEndpoint {
  private baseUrl = 'http://localhost:8080/api/tutorials';

  constructor(localStorage: LocalStorageService, private http: HttpClient) {
    super(localStorage)
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl,{headers:this.headers});
  }

  get(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`,{headers:this.headers});
  }

  create(data): Observable<any> {
    return this.http.post(this.baseUrl, data,{headers:this.headers});
  }

  update(id, data): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data,{headers:this.headers});
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,{headers:this.headers});
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl,{headers:this.headers});
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${this.baseUrl}?title=${title}`,{headers:this.headers});
  }
}
