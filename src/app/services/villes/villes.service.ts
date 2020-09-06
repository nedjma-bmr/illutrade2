import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ville } from 'src/app/models/ville.model';

@Injectable({
  providedIn: 'root'
})
export class VillesService {

  private url= 'http://192.168.42.1:8080/app/api/villes';
  


  constructor(private http:HttpClient) { }

  /**
   * récupération de la liste des villes
   */
  getAll(){
    return this.http.get<[Ville]>(this.url);

  }


  

}
