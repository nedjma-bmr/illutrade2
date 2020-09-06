import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facture } from 'src/app/models/facture.model';

@Injectable({
  providedIn: 'root'
})
export class FacturesService {

  private url3= 'http://192.168.42.1:8080/app/api/NumBons/numFacture';
  private url= 'http://192.168.42.1:8080/app/api/factures';
  private url2='http://192.168.42.1:8080/app/api/clientFacture';
  constructor(private http:HttpClient) { }

  /**
   * récupération de la liste des bons de Facture
   */
  getAll(){
    return this.http.get<[Facture]>(this.url);

  }



  /**
 * 
 * @param id récupération des bons de Facture selon l'id 
 */

get(id: string){
  return this.http.get<[Facture]>(this.url + '/' + id);
}



/**
 * 
 * @param clientId récupération de la liste des bons de Facture selon l'id client 
 */
getListFactureByClientId(clientId : string){
  return this.http.get<[Facture]>(this.url2 + '/' + clientId);
}


/**
   * 
   * @param bonFact ajout d'un bon de Facture
   */
  create(bonFact: Facture ){
   
    return this.http.post(this.url, bonFact);
}

/**
 * recuperer le nouveau num de facture à inserer 
 */
getNumBon(){
  return this.http.get<[Facture]>(this.url3);

}

}
 