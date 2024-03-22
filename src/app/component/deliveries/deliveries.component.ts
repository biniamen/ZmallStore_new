import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { StoreUser } from 'src/app/_models/user';
import { AccountService } from 'src/app/services/account.service';
import { OrderService } from 'src/app/services/order.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {
  moment = moment;
  apiUrl = 'https://test.zmallapp.com/api/store';
  responseData: any;
  selectedorder: any;
  currentUser!: StoreUser;
  selectedVechile: any
  vechiledata: any
  vechilies!: any[];
  state: any
  notifyNew: any;

  public selectedOrderIndex = 0;
  constructor(private http: HttpClient,private router: Router,public accountService: AccountService,private shareService: SharedService,
    public orderService: OrderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser = this.accountService.getCurrentUser();

    if (!localStorage.getItem('admin_token')) {
      this.router.navigateByUrl('/login')
      return
    }
    this.getdeliveries();
  }
  getStatus(status: number): string {
    return this.shareService.getStatusState(status);
    this.state = this.shareService.getStatusState(status);
  }
  getOrderStateTranslation(state: any): string {
    return this.shareService.translateOrderState(state);
  }
  getdeliveries() {
    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('admin_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
    const payload = {
      store_id: storeId,
      server_token: serverToken,
      request_status: "",
      search_field: "user_detail.first_name",
      search_value: "",
      page: 1
    };
    this.http.post(this.apiUrl + '/delivery_list_search_sort', payload).subscribe(response => {
      this.responseData = response;
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

  cancelOrderRequest(order: any) {
    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('admin_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
    const payload = {
      store_id: storeId,
      server_token:serverToken,
      request_id: order._id

    };
    this.http.post(this.apiUrl + '/cancel_request', payload).subscribe(response => {
      this.notifyNew = response;
      console.log(this.notifyNew)
      if(this.notifyNew.success == true){
        this.toastr.success('Order is Cancelled By Admin');
        location.reload();
      }
      //this.responseData = Object.values(this.responseData)
      console.log(this.notifyNew);
    });
  }



}
