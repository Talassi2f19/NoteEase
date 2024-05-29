import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient) { }

  insert(url: string, body: {}){
    return this.http.post(url, body);
  }

  get(url: string){
    return this.http.get(url);
  }

  remove(url: string, id: string){
    return this.http.delete(url + "/" + id + ".json");
  }

  update(url: string, id: string, body: {}){
    return this.http.patch(url + "/" + id + ".json", body);
  }
}
