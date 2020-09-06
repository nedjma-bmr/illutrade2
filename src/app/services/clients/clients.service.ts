import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/models/client.model';
import { ApiResponse } from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {



  private url= 'http://192.168.42.1:8080/app/api/clients';
  design: string;
  private currentClientId:string;
  constructor(private http:HttpClient) { }
  
  /**
   * récupération de la liste des clients
   */
  getAll(){
    return this.http.get<[Client]>(this.url);

  }
/**
 * 
 * @param id récupération d'un client selon son id 
 */

  get(id: string){
       return this.http.get<Client>(this.url + '/' + id);
  }
/**
 * 
 * @param client ajout d'un client 
 */
  create(client: Client){
      return this.http.post(this.url, client);
  }

/**
 * 
 * @param client modification d'un client 
 * @param id 
 */
  update(client:Client , id:string){
      return this.http.put(this.url + '/' + id, client);
  }
/**
 * 
 * @param id suppression d'un client selon son id 
 */
  remove (id:  string) {
        return this.http.delete<ApiResponse>(this.url + '/' + id);
  }
/**
 * 
 * @param clientId initialisation du client courant 
 */
 setCurrentClientId(clientId : string){
   this.currentClientId = clientId;
 }

 /**
  * récupération du client courant 
  */
 getCurrentClientId(){
   return this.currentClientId;
 }

 emptyCurrentClientId(){
   this.currentClientId = "";
 }

 getDesigntation(id:string){
  this.http.get<Client>(this.url + '/' + id).subscribe((client)=>{
       this.design = client.design_client;
  });
  return this.design ;
}
 
}
