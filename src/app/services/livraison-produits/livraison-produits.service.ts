import { Injectable } from '@angular/core';
import { DevisProduits } from 'src/app/models/devis-produits.model';
import { HttpClient } from '@angular/common/http';
import { LivraisonProduits } from 'src/app/models/livraison-produits.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LivraisonProduitsService {


livraisonProd: LivraisonProduits[]

private url1 = 'http://192.168.42.1:8080/app/api/livraisonProduitsList';
private url= 'http://192.168.42.1:8080/app/api/livraisonProduits';

  constructor(private http:HttpClient) { }
  
/**
 * 
 * @param livraisonProd ajout des produits à un bon de livraison 
 */

  add(livraisonProd:LivraisonProduits[] ){
    return this.http.post(this.url1  , livraisonProd);
  }


  /**
   * 
   * @param id récupération des produits selon l'id devis 
   */

get(id: string){
  return this.http.get<[LivraisonProduits]>(this.url + '/' + id);
}

}
