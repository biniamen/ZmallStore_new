import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreUser } from 'src/app/_models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  // to get current user data
  @Input() isAdmin!: boolean;
  @Input() user: any;
  currentUser!: StoreUser;
  dataFromLocalStorage: any
  constructor(public accountService: AccountService,private router: Router,private toastr: ToastrService) { }
  name!: string
  ngOnInit(): void {
    this.currentUser = this.accountService.getCurrentUser();

    const userDataString = localStorage.getItem('userdata');
    // Parse the JSON object
    //const data = userDataString ? JSON.parse(userDataString) : null;

    // Get the name property
    //const name = data.store.name;
    //this.dataFromLocalStorage = userDataString ? JSON.parse(userDataString) : null;

  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('store_id');
    localStorage.removeItem('admin_token');
    this.router.navigateByUrl('/login');
    this.toastr.error('LoggedOut!');


   // this.currentUserSource.next(null);
  }


}
