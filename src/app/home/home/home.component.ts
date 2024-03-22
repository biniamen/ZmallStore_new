import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  orderList!: any[];
  userDetail: any;
 // userDetails: UserDetail[];
  constructor(private router: Router,private accountService: AccountService) {

   }

  ngOnInit(): void {
    if (!localStorage.getItem('admin_token')) {
      this.router.navigateByUrl('/login')
      return
    }

    const storeId1 = localStorage.getItem('store_id');
    const storeId = storeId1 ? JSON.parse(storeId1) : null;
    const serverToken1 = localStorage.getItem('server_token');
    const serverToken = serverToken1 ? JSON.parse(serverToken1) : null;
    this.accountService.getHistory(storeId,serverToken).subscribe((response: any) => {
      this.orderList = response;
      const userDetails = response.new_order_list[0].cart_detail.destination_addresses[0].user_details;
      const name = userDetails.name;
      console.log(userDetails)

   }

  )
}



}
