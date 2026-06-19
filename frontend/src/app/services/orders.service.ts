import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = 'https://prueba-tecnica-dk1d.onrender.com/orders';

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

}
