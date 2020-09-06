import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { produit } from 'src/app/models/produit.model';
import { DevisProduits } from 'src/app/models/devis-produits.model';


@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  
  private url= 'http://192.168.42.1:8080/app/api/produit';
  items : produit[]=[];

  constructor(private http:HttpClient) { }
  
  /**
   * récupération de la liste des produits
   */
  getAll(){
    return this.http.get<[produit]>(this.url);

  }

// recupération d'un produit selon l'id 
  get(id: string){
       return this.http.get<[produit]>(this.url + '/' + id);
  }

  get2(id: string){
    this.items = [];
    this.http.get<[produit]>(this.url).subscribe((data)=>{
       console.log(data)

       for(let key in data){
         if(data[key].code_fami === id){
           this.items.push(data[key]);
         }
       }
    });
    return this.items ;
}
}
