import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { StoreloginComponent } from './component/storelogin/storelogin.component';
import { AuthGuard } from './guards/auth-guard.service';
import { StoreregisterComponent } from './component/storeregister/storeregister.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { AdminloginComponent } from './component/admin/adminlogin/adminlogin.component';
import { OrderService } from './services/order.service';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { StoreProfileComponent } from './component/store/store-profile/store-profile.component';
import { EditOrderComponent } from './component/store/edit-order/edit-order.component';
import { AcceptedOrderComponent } from './component/accepted-order/accepted-order.component';
import { DeliveriesComponent } from './component/deliveries/deliveries.component';

const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]},
{path: 'login', component: StoreloginComponent},
{path: 'profile', component: StoreProfileComponent},
{path: 'admin/login', component: AdminloginComponent},
{path: 'admin/store', component: StoreloginComponent},
{path: 'register', component: StoreregisterComponent},
{path: 'order_list', component: OrderListComponent},
{path: 'order_history', component: OrderHistoryComponent},
{path: 'deliveries', component: DeliveriesComponent},
{path: 'editOrder', component: EditOrderComponent },
{path: 'accepted_order', component: AcceptedOrderComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }