import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/neworder';
import { OrderService } from 'src/app/services/order.service';
import { ModalComponent } from '../modals/modal/modal.component';
import { Router } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';
import { StoreUser } from 'src/app/_models/user';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  // order state
  moment = moment;
  notifyNew: any
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
  showNoResult: boolean = true;


  //bsModalRef: BsModalRef<ModalComponent> = new BsModalRef<ModalComponent>();

  apiUrl = 'https://test.zmallapp.com/api/store';
  responseData: any;
  currency_sign: any

  constructor(public orderService: OrderService,private http: HttpClient,private router: Router,
    private responseService: ResponseService,private shareService: SharedService,
    public accountService: AccountService,private toastr: ToastrService) {



  }
  changeIndex(newIndex: number) {
    this.currentIndex = newIndex;
    console.log(this.currentIndex)
  }
  viewOrderDetail(order: any) {
   // const modalRef = this.modalService.open(OrderModalComponent);
    //modalRef.componentInstance.orderData = order;
  }

  orderHistory() {
    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('admin_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
    const payload = {
      store_id: storeId,
      server_token: serverToken
    };
    this.http.post('https://test.zmallapp.com/api/admin/get_country_list', payload).subscribe(response => {
      this.responseData = response;
      this.history = response;
      console.log(this.responseData);
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
      this.showNoResult = this.responseData.length === 0;
      if(this.responseData.length === 0){
        this.toastr.success('No New Order Is There');      }
      this.currency_sign = this.responseData.currency_sign
      //this.responseData = Object.values(this.responseData)
      console.log(this.responseData);
    });
  }

  sendResponseData(cartDetail: any) {
    this.responseService.setResponseData(cartDetail);
  }
  getStatus(status: number): string {
    return this.shareService.getStatusState(status);
  }


  ngOnInit(): void {
    this.currentUser = this.accountService.getCurrentUser();
   this.getNewOrder();
   this.orderHistory();
   setInterval(() => {
    this.notifyNewOrder();
  }, 10000);
   if (!localStorage.getItem('admin_token')) {
    this.router.navigateByUrl('/login')
    return
  }

  }


  redirectToPage(): void {
    this.router.navigate(['/order_list']); // Replace '/your-page' with the actual URL or route path
  }

  acceptOrder(order: any) {
    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('admin_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
    const payload = {
      store_id: storeId,
      server_token:serverToken,
      order_id: order._id,
      order_status: 3
    };

    this.http.post('https://test.zmallapp.com/api/store/set_order_status', payload).subscribe((response) => {
      console.log('Order approved', response);
      if(response){
        this.toastr.success('Order Accepted');
      } this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/order_list']);
      });

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
        location.reload();
      }
      //this.responseData = Object.values(this.responseData)
      console.log(this.notifyNew);
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
        this.toastr.success('New Order is There!');
        this.redirectToPage();



      }
      //this.responseData = Object.values(this.responseData)
      console.log(this.notifyNew);
    });
  }

}
