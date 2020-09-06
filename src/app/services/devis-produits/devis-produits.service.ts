import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DevisProduits} from 'src/app/models/devis-produits.model'
import { ProduitsDevisPage } from 'src/app/pages/produits-devis/produits-devis.page';
import { BehaviorSubject } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class DevisProduitsService {

  
  devisProd : DevisProduits[];
  private url= 'http://192.168.42.1:8080/app/api/devisProduits';
  private url1 = 'http://192.168.42.1:8080/app/api/devisProduitsList';
  constructor(private http:HttpClient) { }

  /**
   * récupération de la liste des devis produits 
   */
  getAll(){
    return this.http.get<[DevisProduits]>(this.url);
  }

  /**
   * 
   * @param id récupération des produits selon l'id devis 
   */

get(id: string){
    return this.http.get<[DevisProduits]>(this.url + '/' + id);
}



/**
 * 
 * @param devisProd mise à jour de la table devisProduits
 */
update(devisProd:DevisProduits[] ){
  return this.http.put(this.url1  , devisProd);
}


/**
 * 
 * @param devisProd ajout des produits à un devis 
 */

add(devisProd:DevisProduits[] ){
  return this.http.post(this.url1  , devisProd);
}

/**
 * suppression des produits dans un devis 
 */

remove (id:  string) {
  return this.http.delete<ApiResponse>(this.url + '/' + id);
}





}

