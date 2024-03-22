import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidemenuComponent } from './sidemenu/sidemenu/sidemenu.component';
import { HomeComponent } from './home/home/home.component';
import { StoreloginComponent } from './component/storelogin/storelogin.component';
import { AuthGuard } from './guards/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreregisterComponent } from './component/storeregister/storeregister.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { ModalComponent } from './component/modals/modal/modal.component';
import { AdminloginComponent } from './component/admin/adminlogin/adminlogin.component';
import { StoreusersComponent } from './component/store/storeusers/storeusers.component';
import { ToastrModule } from 'ngx-toastr';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { DeliveriesComponent } from './component/deliveries/deliveries.component';
import { StoreProfileComponent } from './component/store/store-profile/store-profile.component';
import { EditOrderComponent } from './component/store/edit-order/edit-order.component';
import { AcceptedOrderComponent } from './component/accepted-order/accepted-order.component';
import { APP_BASE_HREF } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    HomeComponent,
    StoreloginComponent,
    StoreregisterComponent,
    OrderListComponent,
    ModalComponent,
    AdminloginComponent,
    StoreusersComponent,
    OrderHistoryComponent,
    DeliveriesComponent,
    StoreProfileComponent,
    EditOrderComponent,
    AcceptedOrderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),

  ],
  providers: [AuthGuard,{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
  // entryComponents: [
  //   ModalComponent
  // ]
})
export class AppModule {

 }
