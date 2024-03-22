import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Order } from "../_models/neworder";

@Injectable({
    providedIn: 'root'
  })

  export class SharedService {
    constructor(private http: HttpClient, private router: Router){}
    // getStatusState(status: number): string {
    //   switch(status) {
    //     case 1:
    //       return 'WAITING_FOR_ACCEPT_STORE';
    //     case 101:
    //       return 'CANCELED_BY_USER';
    //     case 3:
    //       return 'STORE_ACCEPTED';
    //     case 103:
    //       return 'STORE_REJECTED';
    //     case 104:
    //       return 'STORE_CANCELLED';
    //     case 105:
    //       return 'STORE_CANCELLED_REQUEST';
    //     case 5:
    //       return 'STORE_PREPARING_ORDER';
    //     case 7:
    //       return 'OREDER_READY';
    //     case 9:
    //       return 'WAITING_FOR_DELIVERY_MAN';
    //     case 109:
    //       return 'NO_DELIVERY_MAN_FOUND';
    //     case 11:
    //       return 'DELIVERY_MAN_ACCEPTED';
    //     case 111:
    //       return 'DELIVERY_MAN_REJECTED';
    //     case 112:
    //       return 'DELIVERY_MAN_CANCELLED';
    //     case 13:
    //       return 'DELIVERY_MAN_COMING';
    //     case 15:
    //       return 'DELIVERY_MAN_ARRIVED';
    //     case 17:
    //       return 'DELIVERY_MAN_PICKED_ORDER';
    //     case 19:
    //       return 'DELIVERY_MAN_STARTED_DELIVERY';
    //     case 21:
    //       return 'DELIVERY_MAN_ARRIVED_AT_DESTINATION';
    //     case 23:
    //       return 'DELIVERY_MAN_COMPLETE_DELIVERY';
    //     case 25:
    //       return 'ORDER_COMPLETED';
    //     default:
    //       return 'Unknown state';
    //   }
    // }

    getStatusState(status: number): string {
      switch(status) {
        case 1:
          return 'NEW ORDER CREATED';
        case 101:
          return 'CANCELED BY USER';
        case 3:
          return 'STORE ACCEPTED';
        case 103:
          return 'STORE REJECTED';
        case 104:
          return 'STORE CANCELLED';
        case 105:
          return 'STORE CANCELLED REQUEST';
        case 5:
          return 'STORE PREPARING ORDER';
        case 7:
          return 'OREDER READY';
        case 9:
          return 'WAITING FOR DELIVERY MAN';
        case 109:
          return 'NO DELIVERY MAN FOUND';
        case 11:
          return 'DELIVERY MAN ACCEPTED';
        case 111:
          return 'DELIVERY MAN REJECTED';
        case 112:
          return 'DELIVERY MAN CANCELLED';
        case 13:
          return 'DELIVERY MAN COMING';
        case 15:
          return 'DELIVERY MAN ARRIVED';
        case 17:
          return 'DELIVERY MAN PICKED ORDER';
        case 19:
          return 'DELIVERY MAN STARTED DELIVERY';
        case 21:
          return 'DELIVERY MAN ARRIVED AT DESTINATION';
        case 23:
          return 'DELIVERY MAN COMPLETE DELIVERY';
        case 25:
          return 'ORDER COMPLETED';
        default:
          return 'Unknown state';
      }
    }

    ORDER_STATE = {
      WAITING_FOR_ACCEPT_STORE: 1,
      CANCELED_BY_USER: 101,
      STORE_ACCEPTED: 3,
      STORE_REJECTED: 103,
      STORE_CANCELLED: 104,
      STORE_CANCELLED_REQUEST: 105,
      STORE_PREPARING_ORDER: 5,
      OREDER_READY: 7,
      WAITING_FOR_DELIVERY_MAN: 9,
      NO_DELIVERY_MAN_FOUND: 109,
      DELIVERY_MAN_ACCEPTED: 11,
      DELIVERY_MAN_REJECTED: 111,
      DELIVERY_MAN_CANCELLED: 112,
      DELIVERY_MAN_COMING: 13,
      DELIVERY_MAN_ARRIVED: 15,
      DELIVERY_MAN_PICKED_ORDER: 17,
      DELIVERY_MAN_STARTED_DELIVERY: 19,
      DELIVERY_MAN_ARRIVED_AT_DESTINATION: 21,
      DELIVERY_MAN_COMPLETE_DELIVERY: 23,
      ORDER_COMPLETED: 25
    };

    translateOrderState(state: any): string {
      switch (state) {
        case this.ORDER_STATE.WAITING_FOR_ACCEPT_STORE:
          return 'Waiting for store acceptance';
        case this.ORDER_STATE.CANCELED_BY_USER:
          return 'Canceled by user';
        case this.ORDER_STATE.STORE_ACCEPTED:
          return 'Store accepted';
        case this.ORDER_STATE.STORE_REJECTED:
          return 'Store rejected';
        case this.ORDER_STATE.STORE_CANCELLED:
          return 'Store cancelled';
        case this.ORDER_STATE.STORE_CANCELLED_REQUEST:
          return 'Store cancelled request';
        case this.ORDER_STATE.STORE_PREPARING_ORDER:
          return 'Store preparing order';
        case this.ORDER_STATE.OREDER_READY:
          return 'Order ready';
        case this.ORDER_STATE.WAITING_FOR_DELIVERY_MAN:
          return 'Waiting for delivery man';
        case this.ORDER_STATE.NO_DELIVERY_MAN_FOUND:
          return 'No delivery man found';
        case this.ORDER_STATE.DELIVERY_MAN_ACCEPTED:
          return 'Delivery man accepted';
        case this.ORDER_STATE.DELIVERY_MAN_REJECTED:
          return 'Delivery man rejected';
        case this.ORDER_STATE.DELIVERY_MAN_CANCELLED:
          return 'Delivery man cancelled';
        case this.ORDER_STATE.DELIVERY_MAN_COMING:
          return 'Delivery man coming';
        case this.ORDER_STATE.DELIVERY_MAN_ARRIVED:
          return 'Delivery man arrived';
        case this.ORDER_STATE.DELIVERY_MAN_PICKED_ORDER:
          return 'Delivery man picked order';
        case this.ORDER_STATE.DELIVERY_MAN_STARTED_DELIVERY:
          return 'Delivery man started delivery';
        case this.ORDER_STATE.DELIVERY_MAN_ARRIVED_AT_DESTINATION:
          return 'Delivery man arrived at destination';
        case this.ORDER_STATE.DELIVERY_MAN_COMPLETE_DELIVERY:
          return 'Delivery man complete delivery';
        case this.ORDER_STATE.ORDER_COMPLETED:
          return 'Order completed';
        default:
          return '';
      }
    }

}