import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  model: any = {};
  constructor(public accountService: AccountService,private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('administrator_token')) {
      this.router.navigateByUrl('/admin/login')
  }
  }

  login() {
    this.accountService.adminlogin(this.model).subscribe({
      next: _ => {
        this.toastr.success('Admin Successfully LoggedIn');
        this.router.navigateByUrl('/');
        this.model = {};
      },

    })
  }

}
