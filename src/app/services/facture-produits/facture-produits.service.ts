import { Injectable } from '@angular/core';
import { FactureProduits } from 'src/app/models/facture-produits.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FactureProduitsService {

 factureProd: FactureProduits[]

private url1 = 'http://192.168.42.1:8080/app/api/factureProduitsList';
private url= 'http://192.168.42.1:8080/app/api/factureProduits';

  constructor(private http:HttpClient) { }

  /**
 * 
 * @param factureProd ajout des produits à un bon de livraison 
 */

add(factureProd:FactureProduits[] ){
  return this.http.post(this.url1  , factureProd);
}


/**
 * 
 * @param id récupération des produits selon l'id devis 
 */

get(id: string){
return this.http.get<[FactureProduits]>(this.url + '/' + id);
}
}
