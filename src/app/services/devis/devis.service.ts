import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Devis } from 'src/app/models/devis.model';

import { ApiResponse } from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  private url= 'http://192.168.42.1:8080/app/api/devis';
  private url2='http://192.168.42.1:8080/app/api/clientDevis';
  private url3= 'http://192.168.42.1:8080/app/api/NumBons/numBonDevis';
 

  constructor(private http:HttpClient) { }

  /**
   * récupération de la liste des devis
   */
  getAll(){
    return this.http.get<[Devis]>(this.url);

  }
/**
 * 
 * @param id récupération des devis selon l'id 
 */

  get(id: string){
       return this.http.get<[Devis]>(this.url + '/' + id);
  }

/**
 * 
 * @param clientId récupération de la liste des devis selon l'id client 
 */
  getListDevisByClientId(clientId : string){
    return this.http.get<[Devis]>(this.url2 + '/' + clientId);
  }

  /**
   * 
   * @param devis ajout d'un devis 
   */
  create(devis: Devis){
    return this.http.post(this.url, devis);
}


/**
 * 
 * @param id suppression d'un devis selon son id 
 */
remove (id:  string) {
  return this.http.delete<ApiResponse>(this.url + '/' + id);
}

/**
 * recuperer le nouveau num de devis à inserer 
 */
getNumBon(){
  return this.http.get<[Devis]>(this.url3);

}


/**
 * 
 * @param devis modification d'un devis
 * @param id 
 */
update(devis:Devis , id:string){
  return this.http.put(this.url + '/' + id, devis);
}
 
}

