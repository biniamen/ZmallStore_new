import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { StoreUser } from 'src/app/_models/user';
import { AccountService } from 'src/app/services/account.service';
import { ResponseService } from 'src/app/services/response.service';
import { SharedService } from 'src/app/services/shared.service';



@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  // order state
  moment = moment;
  apiUrl = 'https://test.zmallapp.com/api/store';
  responseData: any;
  notifyNew: any;
  selectedorder: any;
  currency_sign: any
  status!: number
  currentUser!: StoreUser;
  cartDetail: any
  public selectedOrderIndex = 0;
  constructor(private http: HttpClient,private router: Router, private toastr: ToastrService, private shareService: SharedService,
    public accountService: AccountService,private responseService: ResponseService) { }

  ngOnInit(): void {
    // this.loadScript('../../../assets/assets/plugins/datatables.net/js/dataTables.min.js');
    // this.loadScript('../../../assets/assets/plugins/datatables.net-bs5/js/dataTables.bootstrap5.min.js');
    // this.loadScript('../../../assets/assets/plugins/datatables.net-buttons/js/dataTables.buttons.min.js');
    // this.loadScript('../../../assets/assets/plugins/datatables.net-buttons/js/buttons.colVis.min.js');
    // this.loadScript('../../../assets/assets/plugins/datatables.net-buttons/js/buttons.flash.min.js');
    // this.loadScript('../../../assets/assets/plugins/datatables.net-buttons/js/buttons.html5.min.js');
    // this.loadScript('../../../assets/assets/plugins/datatables.net-buttons/js/buttons.print.min.js');
    // this.loadScript('../../../assets/assets/plugins/datatables.net-buttons-bs5/js/buttons.bootstrap5.min.js');
    // this.loadScript('../../../assets/assets/plugins/datatables.net-responsive/js/dataTables.responsive.min.js');
    // this.loadScript('../../../assets/assets/plugins/datatables.net-responsive-bs5/js/responsive.bootstrap5.min.js');




    this.currentUser = this.accountService.getCurrentUser();
    this.currency_sign = 'ብር';
    if (!localStorage.getItem('admin_token')) {
      this.router.navigateByUrl('/login')
      return
    }
    this.getHistory();
    // Notify new order every 30 second
    setInterval(() => {
      this.notifyNewOrder();
    }, 30000);
  }

  sendResponseData(cartDetail: any) {
    this.responseService.setResponseData(cartDetail);
  }
  getStatus(status: number): string {
    return this.shareService.getStatusState(status);
  }

  getHistory() {
    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('admin_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
    const payload = {
      store_id: storeId,
      server_token: serverToken,
      start_date: "",
      end_date: "",
      payment_status: "all",
      created_by: "both",
      pickup_type: "both",
      order_type: "both",
      order_status_id: "",
      search_field: "user_detail.first_name",
      search_value: "",
      page: 1
    };
    this.http.post(this.apiUrl + '/history', payload).subscribe(response => {
      this.responseData = response;
      //this.currency_sign = this.responseData.currency_sign
      //this.responseData = Object.values(this.responseData)
      console.log(this.responseData);
    });
  }

  // Notify if New order is there
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
        this.toastr.success('New Order with order Unique ID'+this.notifyNew.unique_id);
      }
      //this.responseData = Object.values(this.responseData)
      console.log(this.notifyNew);
    });
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

}
