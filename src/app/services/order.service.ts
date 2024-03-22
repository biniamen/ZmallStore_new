import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Order } from "../_models/neworder";

@Injectable({
    providedIn: 'root'
  })

  export class OrderService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient, private router: Router){}


    getOrderList (storeId: string, serverToken: string)  {
        const payload = {
          store_id: storeId,
          server_token: serverToken
        };
        return this.http.post(this.baseUrl + '/get_order_list', payload);
  }
  getOrderData(storeId: string, serverToken: string): Observable<Order[]> {
    const payload = {
        store_id: storeId,
        server_token: serverToken
      };
    return this.http.post<Order>(this.baseUrl + '/get_order_list', payload).pipe(
        map((response: any) => response as Order[]),
        catchError((error: any) => {
          console.error(error);
          throw error;
        })
      );
  }

  getOrders(storeId: string, serverToken: string): Observable<Order[]> {
    const payload = {
        store_id: storeId,
        server_token: serverToken
      };
    // return this.http.post<Order[]>(this.baseUrl + '/get_order_list', payload).pipe(
    //     map(response => Object.values(response))

    //    );
    return this.http.post<Order[]>(this.baseUrl + '/get_order_list', payload);

  }

  // acceptOrder(order: Order): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${order.id}`, { approved: true });
  // }

  getVechile(storeId: string, serverToken: string): Observable<any[]> {
    const payload = {
        store_id: storeId,
        server_token: serverToken
      };
    // return this.http.post<Order[]>(this.baseUrl + '/get_order_list', payload).pipe(
    //     map(response => Object.values(response))

    //    );
    return this.http.post<Order[]>(this.baseUrl + '/get_order_list', payload);

  }

}