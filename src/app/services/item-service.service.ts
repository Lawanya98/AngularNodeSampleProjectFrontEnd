import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get('http://localhost:8090/api/items');
  }

  getItemById(id) {
    return this.http.get(`http://localhost:8090/api/items/${id}`);
  }

  deleteItemById(id) {
    return this.http.delete(`http://localhost:8090/api/items/${id}`);
  }

  addNewItem(item) {
    return this.http.post('http://localhost:8090/api/items', item);
  }

  updateItemById(id, item) {
    return this.http.put(`http://localhost:8090/api/items/${id}`, item);
  }
}
