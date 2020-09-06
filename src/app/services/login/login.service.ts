import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from'rxjs/operators';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url='http://192.168.42.1:8080/app/api';

  constructor(private http:HttpClient) { }

// envoie les infos d'authentification et récuperer le token 

  login(credentials:User): Observable<string>{
    return this.http.post<{token : string}>(`${this.url}/login`, credentials).pipe(
      map(response=> response.token)
    );
  }
}
