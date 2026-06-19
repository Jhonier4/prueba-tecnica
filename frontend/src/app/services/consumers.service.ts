import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumersService {

  private apiUrl = 'http://localhost:3000/consumers';

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    return this.http.get(this.apiUrl);
  }

  create(consumer: any): Observable<any> {
    return this.http.post(this.apiUrl, consumer);
  }

  update(id: number, consumer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, consumer);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}