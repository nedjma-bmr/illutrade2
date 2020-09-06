import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { produit } from 'src/app/models/produit.model';
import { famille } from 'src/app/models/famille.model';


@Injectable({
  providedIn: 'root'
})
export class FamilleService {

 
  private url= 'http://192.168.42.1:8080/app/api/famille';


  constructor(private http:HttpClient) { }
  
  /**
   * récupération de la liste des familles
   */
  getAll(){
    return this.http.get<[famille]>(this.url);

  }

 /**
  * 
  * @param code_fam recupération d'une famille selon le code_fam
  */
  get(code_fam:number){
       return this.http.get<famille>(this.url + '/' + code_fam);
  }

  
}