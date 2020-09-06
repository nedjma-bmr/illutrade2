import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommandProduits } from 'src/app/models/commande-produit.model';
import { ApiResponse } from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CommandesProduitsService {

  
  private url= 'http://192.168.42.1:8080/app/api/commandes_produits';
  
  private url1 = 'http://192.168.42.1:8080/app/api/CmdproduitsList';

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<[CommandProduits]>(this.url);

  }
  
  create(cmdprod:CommandProduits){
   return  this.http.post<[CommandProduits]>(this.url , cmdprod);
  }
  
  get(id: number){
    return this.http.get<[CommandProduits]>(this.url + '/' + id);
}


update(cmdProd:CommandProduits[] ){
  return this.http.put(this.url1  , cmdProd);
}
remove(id:string){
  return this.http.delete<ApiResponse>(this.url + '/' + id);
}

add(cmdProd:CommandProduits[] ){
  return this.http.post(this.url  , cmdProd);
}
}
