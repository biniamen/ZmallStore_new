import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Order } from "../_models/neworder";


@Injectable({
    providedIn: 'root'
  })

  export class ResponseService {
    private responseDataSubject = new BehaviorSubject<any>(null);
    constructor(private http: HttpClient, private router: Router){}

    setResponseData(responseData: any) {
      this.responseDataSubject.next(responseData);
    }

    getResponseData() {
      return this.responseDataSubject.asObservable();
    }

}