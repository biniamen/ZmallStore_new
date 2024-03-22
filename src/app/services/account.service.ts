import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { AdminData, StoreUser } from "../_models/user";
import { Router } from "@angular/router";
import { City, Country } from "../_models/countrycity";
import { ToastrService } from "ngx-toastr";


@Injectable({
    providedIn: 'root'
  })

  export class AccountService {
    baseUrl = environment.apiUrl;
    adminUrl = environment.adminUrl;
    dataFromLocalStorage: any
    constructor(private http: HttpClient, private router: Router,private toastr: ToastrService){}
    private currentUserSource = new BehaviorSubject<StoreUser | null>(null);
    currentUser$ = this.currentUserSource.asObservable();
    isAdmin!: boolean;

    login1(model: any) {
        return this.http.post<StoreUser>(this.baseUrl + '/login', model).pipe(
          map((response: StoreUser) => {
            const user = response;
            console.log(response)
            if (user) {
              this.setCurrentUser(user);
            }
          })
        )
      }



      setCurrentUser(user: StoreUser) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
      }


      getDecodedToken() {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          return decodedToken;
        } else {
          return null;
        }
      }

      // Register store user
      register(model: any) {
        return this.http.post<StoreUser>(this.baseUrl + '/register', model).pipe(
          map(user => {
            if (user.success== true) {
              this.toastr.success('Successfully Registered');
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/login']);
              });
              //this.setCurrentUser(user);
              console.log(model);
              console.log(user);
            }
            else {
              console.log(user);
              this.toastr.error('Error In Register');
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/register']);
              });
            }
          })
        )
      }

      getHistory (storeId: string, serverToken: string)  {
        const payload = {
          store_id: storeId,
          server_token: serverToken
        };
        return this.http.post(this.baseUrl + '/get_order_list', payload);
        //return this.http.get<StoreUser[]>(`${this.baseUrl}/get_order_list`);
      }

      logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('store_id');
        localStorage.removeItem('admin_token');

        this.currentUserSource.next(null);
      }

      login(model: any) {
        return this.http.post<StoreUser>(this.baseUrl + '/login', model).pipe(
          map((response: any) => {
            const user = response;
            console.log(user)
            if (user.success === true) {
              //localStorage.setItem('user',JSON.stringify(user))
              this.setCurrentUser(user);
              // setting key value
              localStorage.setItem('store_id', JSON.stringify(user.store._id));
              localStorage.setItem('admin_token', JSON.stringify(user.store.server_token));
              this.toastr.success('Successfully LoggedIn');
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/order_list']);
              });
              console.log(user.store.server_token)
            } else {
              this.toastr.error('Username or password Incorrect');
              
              model.resetForm();
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/login']);
              });
            }
          })
        )
      }
      // Admin Login
      adminlogin(model: any) {
        return this.http.post<AdminData>(this.adminUrl + 'login', model).pipe(
          map((response: any) => {
            const user = response;
            console.log(user)
            if (user.success === true) {
              this.isAdmin = true
              //localStorage.setItem('user',JSON.stringify(user))
              //this.setCurrentUser(user);
              // setting key value
              localStorage.setItem('administrator_id', JSON.stringify(user._id));
              localStorage.setItem('administrator_token', JSON.stringify(user.server_token));
             // localStorage.setItem('store_document_ulpoaded', JSON.stringify(user.store.server_token));

              console.log(user.store.server_token)
            }
          })
        )
      }

      getCurrentUser(): StoreUser {
        const userJson = localStorage.getItem('user');
        return userJson ? JSON.parse(userJson) : null;
      }


      // Getting Country and City
      getCountryList() {
        const url = 'https://test.zmallapp.com/api/admin/get_country_list';
        return this.http.get(url);
      }

      getCityList(countryId: string) {
        const url = 'https://test.zmallapp.com/api/admin/get_city_list';
        const payload = { country_id: countryId };
        return this.http.post(url, payload);
      }
      get_delivery_list_for_city(city_id: string) {
        const url = 'https://test.zmallapp.com/api/admin/get_delivery_list_for_city';
        const payload = { city_id: city_id };
        return this.http.post(url, payload);
        // .pipe(
        //   map(response => Object.values(response)));
      }

  }