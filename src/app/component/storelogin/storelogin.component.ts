import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
//import { User } from '../../_models/user';
import { Router } from '@angular/router';
// import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-storelogin',
  templateUrl: './storelogin.component.html',
  styleUrls: ['./storelogin.component.css']
})
export class StoreloginComponent implements OnInit {

  model: any = {};
  loggedIn = false;
  constructor(public accountService: AccountService,private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/home')
      return
    }
  }

  login() {
    this.accountService.login(this.model).subscribe((response: any) => {
      this.loggedIn == true;
      if(response.success == true){
        this.toastr.success('Successfully LoggedIn');
        this.router.navigateByUrl('/order_list');
      }
      else {
        this.toastr.error('Something is Wrong');
        this.router.navigateByUrl('/login');
      }

      console.log(response);
    })
  }

}
