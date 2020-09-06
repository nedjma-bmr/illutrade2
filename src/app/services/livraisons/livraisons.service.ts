import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livraison } from 'src/app/models/livraison.model';
@Injectable({
  providedIn: 'root'
})
export class LivraisonsService {

  private url= 'http://192.168.42.1:8080/app/api/livraisons';
  private url2='http://192.168.42.1:8080/app/api/clientLivraison';
  private url3= 'http://192.168.42.1:8080/app/api/NumBons/numBonLivraison';
 private url4 = 'http://192.168.42.1:8080/app/api/BonLivFacturer';
 

  constructor(private http:HttpClient) { }

  /**
   * récupération de la liste des bons de livraison
   */
  getAll(){
    return this.http.get<[Livraison]>(this.url);

  }



  /**
 * 
 * @param id récupération des bons de livraison selon l'id 
 */

get(id: string ){
  return this.http.get<[Livraison]>(this.url + '/' + id);
}



/**
 * 
 * @param clientId récupération de la liste des bons de livraison selon l'id client 
 */
getListLivraisonByClientId(clientId : string){
  return this.http.get<[Livraison]>(this.url2 + '/' + clientId);
}


/**
   * 
   * @param bonLiv ajout d'un bon de livraison
   */
  create(bonLiv: Livraison ){
   
    return this.http.post(this.url, bonLiv);
}


/**
 * recuperer le nouveau num de livraison à inserer 
 */
getNumBon(){
  return this.http.get<[Livraison]>(this.url3);

}
/**
 * mettre a jour le bon de livraison modifié 
 */

update(BonLiv:Livraison , id:string){
  return this.http.put(this.url + '/' + id, BonLiv);
}


/**
 * 
 * @param clientId récupération de la liste des bons de livraison selon l'id client 
 */
getListLivrNonFactByClientId(clientId : string){
  return this.http.get<[Livraison]>(this.url4 + '/' + clientId);
}

}
