import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/_models/neworder';
import { StoreUser } from 'src/app/_models/user';
import { AccountService } from 'src/app/services/account.service';
import { OrderService } from 'src/app/services/order.service';
import { ResponseService } from 'src/app/services/response.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-accepted-order',
  templateUrl: './accepted-order.component.html',
  styleUrls: ['./accepted-order.component.css']
})
export class AcceptedOrderComponent implements OnInit {
  moment = moment;

  orderData!:  Order[]; // Initialize the order list
  orders!: Order[];
  selectedOrder: any;
  formModal: any;
  selectedItem: any;
  history: any
  selectedorder: any;
  currentIndex = 0;
  noResults: any
  currentUser!: StoreUser;
  accepted:any
  apiUrl = 'https://test.zmallapp.com/api/store';
  responseData: any;
  currency_sign: any
  estimated_time!: number;
  selectedVechile: any
  vechiledata: any
  vechilies!: any[];
  notifyNew: any



  constructor(public orderService: OrderService,private http: HttpClient,private router: Router,
    private responseService: ResponseService,private shareService: SharedService,
    public accountService: AccountService,private toastr: ToastrService) {
    }

  ngOnInit(): void {
    this.currentUser = this.accountService.getCurrentUser();
   this.getNewOrder();
   setInterval(() => {
    this.notifyNewOrder();

  }, 10000);

  }


  redirectToPage(): void {
    this.router.navigate(['/order_list']); // Replace '/your-page' with the actual URL or route path
  }

  notifyNewOrder() {
    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('admin_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
    const payload = {
      store_id: storeId,
      server_token: serverToken
    };
    this.http.post(this.apiUrl + '/store_notify_new_order', payload).subscribe(response => {
      this.notifyNew = response;
      this.currency_sign = this.notifyNew.currency_sign
      if(this.notifyNew.success == true){
        //this.redirectToPage();
        this.toastr.success('New Order with order Unique ID'+this.notifyNew.orders.unique_id);
      }
      //this.responseData = Object.values(this.responseData)
      console.log(this.notifyNew);
    });
  }

  getStatus(status: number): string {
    return this.shareService.getStatusState(status);
  }

  rejectOrder(order: any,reason:any) {
    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('admin_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
    const payload = {
      store_id: storeId,
      cancel_reason: reason,
      server_token:serverToken,
      order_id: order._id,
      order_status: 104
    };
    this.http.post(this.apiUrl + '/store_cancel_or_reject_order', payload).subscribe(response => {
      this.notifyNew = response;
      console.log(this.notifyNew)
      this.currency_sign = this.notifyNew.currency_sign
      if(this.notifyNew.success == true){
        this.toastr.success('Order is Rejected By Store');
      }
      //this.responseData = Object.values(this.responseData)
      console.log(this.notifyNew);
    });
  }




  getNewOrder() {
    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('admin_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
    const payload = {
      store_id: storeId,
      server_token: serverToken
    };
    this.http.post(this.apiUrl + '/order_list', payload).subscribe(response => {
      this.responseData = response;
      // if(this.responseData.orders.order_status === 3){
      //   this.accepted = this.responseData
      // }
      this.currency_sign = this.responseData.currency_sign
      //this.responseData = Object.values(this.responseData)
      console.log(this.responseData);
    });
    // getting Vechile list
    const payload2 = {
      store_id: storeId,
      server_token: serverToken
    }
    this.http.post(this.apiUrl + '/get_vehicle_list', payload).subscribe(response => {
      this.vechiledata = response;
      // if(this.responseData.orders.order_status === 3){
      //   this.accepted = this.responseData
      // }
      this.currency_sign = this.responseData.currency_sign
      //this.responseData = Object.values(this.responseData)
      console.log(this.responseData);
    });
  }
  getVechileList(order: any) {
    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('admin_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
     // getting Vechile list
     const payload = {
      order_id: order._id,
      store_id: storeId,
      server_token: serverToken
    }
    this.orderService.getVechile(storeId,serverToken).subscribe((response: any) => {
      console.log(response);
      // Handle the city list response here
      if (response.success) {
        this.vechiledata = response.vechiledata;
        console.log(this.vechiledata)
        // Do something with the city list, e.g. populate a dropdown
      }
    });

  }
  readyOrder(order: any) {
    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('admin_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
    const payload = {
      store_id: storeId,
      server_token:serverToken,
      order_id: order._id,
      order_status: 7
    };
    this.http.post('https://test.zmallapp.com/api/store/set_order_status', payload).subscribe((response) => {
      console.log('Order is Ready', response);
      this.responseData = response

      if(response){

      } this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>  {
        this.toastr.success('Order is Ready to Deliver');
        this.router.navigate(['/accepted_order']).then(() => window.location.reload());
      });

    });
  }

  // Creating Request
  createRequest(order: any,time:any,selectedVechile:any) {
    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('admin_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
    const payload = {
      store_id: storeId,
      server_token:serverToken,
      order_id: order._id,
      estimated_time_for_ready_order: time,
      vehicle_id: selectedVechile
    };
    this.responseData = Object.values(payload)
   console.log('Request'+ this.responseData)
    this.http.post('https://test.zmallapp.com/api/store/create_request', payload).subscribe((response) => {
      console.log('Order prepared', response);
      this.responseData = response
      if(this.responseData.success === true){

        this.router.navigateByUrl('/accepted_order').then(() => window.location.reload())
        this.toastr.success('Order is Preparing...');
      }

      else {
        this.toastr.error('Order is Not Preparing...')
        this.router.navigateByUrl('/accepted_order').then(() => window.location.reload())

      }

    });
  }
}
