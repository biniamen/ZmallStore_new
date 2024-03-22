import { Component, Input, OnInit } from '@angular/core';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  responseData: any;

  constructor(private responseService: ResponseService) { }

  ngOnInit(): void {
    this.responseService.getResponseData().subscribe((data) => {
      this.responseData = data;
      console.log('Carts'+this.responseData)
    });
  }

}
