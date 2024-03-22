import { Component, OnInit } from '@angular/core';
import { StoreUser } from 'src/app/_models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.css']
})
export class StoreProfileComponent implements OnInit {
  currentUser!: StoreUser;
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser = this.accountService.getCurrentUser();
  }

}
