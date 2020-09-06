import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/models/api-response.model';
import { commande } from 'src/app/models/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  private url= 'http://192.168.42.1:8080/app/api/commande';
  private url2='http://192.168.42.1:8080/app/api/clientCmd';

  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get<[commande]>(this.url);

  }


  get(id: number){
       return this.http.get<commande>(this.url + '/' + id);
  }

  
  create(commande: commande){
    return this.http.post(this.url, commande);
}

update(commande:commande ,NumCmd:number){
  return this.http.put(this.url + '/' + NumCmd, commande);
}

remove (id:number) {
      return this.http.delete<ApiResponse>(this.url + '/' + id);
}

getListCmdByClientId(clientId : string){
  return this.http.get<[commande]>(this.url2 + '/' + clientId);
}


}

