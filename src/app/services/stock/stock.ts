import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/models/api-response.model';
import {stock} from '../../models/stock'
@Injectable({
  providedIn: 'root'
})
export class StockService {


  prods : stock[]=[];
  private url= 'http://192.168.42.1:8080/app/api/stock';
 
  constructor(private http:HttpClient) { }
  
  /**
   * récupération de la liste des stocks produits
   */
  getAll(){
     return this.http.get<stock[]>(this.url);
     

  }
/**
 * 
 * @param id récupération d'un produit du stock selon son id 
 */

  get(id: number){
       return this.http.get<stock>(this.url + '/' + id);
  }
/**
 * 
 * @param stock ajout d'un produit 
 */
  create(stock: stock){
      return this.http.post(this.url, stock);
  }

/**
 * 
 * @param stock modification du stock 
 * @param id 
 */
  update(stock:stock , id:string){
      return this.http.put(this.url + '/' + id, stock);
  }
/**
 * 
 * 
 */
  remove (id:  string) {
        return this.http.delete<ApiResponse>(this.url + '/' + id);
  }
 
}
