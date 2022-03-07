import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { }

  // getItems() {
  //   return this.http.get('http://localhost:8090/api/items');
  // }

  // getItemById(id) {
  //   return this.http.get(`http://localhost:8090/api/items/${id}`);
  // }

  // deleteItemById(id) {
  //   return this.http.delete(`http://localhost:8090/api/items/${id}`);
  // }

  // addNewItem(item) {
  //   return this.http.post('http://localhost:8090/api/items', item);
  // }

  // updateItemById(id, item) {
  //   return this.http.put(`http://localhost:8090/api/items/${id}`, item);
  // }

  getItems() {
    return this.http.get('http://localhost:8090/api/getItems').pipe(
      map(response => {
        console.log(response);
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  getItemById(id) {
    console.log(id);
    return this.http.get(`http://localhost:8090/api/getItemById/${id}`).pipe(
      map(response => {
        console.log(response);
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  deleteItemById(id) {
    console.log(id);
    let params = {
      id: id
    }
    console.log(params);
    return this.http.post(`http://localhost:8090/api/deleteItem/`, params).pipe(
      map(response => {
        console.log(response);
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  addNewItem(item) {
    return this.http.post('http://localhost:8090/api/insertItem', item).pipe(
      map(response => {
        console.log(response);
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  updateItemById(id, item) {
    return this.http.post(`http://localhost:8090/api/updateItem/${id}`, item).pipe(
      map(response => {
        console.log(response);
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }
}
