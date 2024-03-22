import { Component } from '@angular/core';
import { StoreUser } from './_models/user';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'zmallstore';

  constructor(public accountService: AccountService,private router: Router) {}
  isLoggedIn() {
    return !!localStorage.getItem('user');
  }

  // remove access token with some minute
  removeAccessTokenAfterTimeout() {
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
      setTimeout(() => {
        localStorage.removeItem('admin_token');
      },  60000);
      this.router.navigateByUrl('/login')
       // 1 minutes in milliseconds
    }
  }

  ngOnInit(): void {
    this.removeAccessTokenAfterTimeout()
    this.setCurrentUser()
  }
  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: StoreUser = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
    //console.log(user.company_name)
  }
  
}
