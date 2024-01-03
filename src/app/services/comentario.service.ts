import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private myAppUrl = 'https://localhost:7256/';
  private myApiUrl = 'api/comentario/'

  constructor(private http: HttpClient) { }

  getListComentarios(): Observable<any> {
    return this.http.get(this.myAppUrl+this.myApiUrl);
  }

}
