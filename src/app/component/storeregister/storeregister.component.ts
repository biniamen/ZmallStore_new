import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Country, City } from 'src/app/_models/countrycity';
import { StoreUser, User } from 'src/app/_models/user';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-storeregister',
  templateUrl: './storeregister.component.html',
  styleUrls: ['./storeregister.component.css']
})
export class StoreregisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  selectedCountry!: string;
  countries!: any[];
  cities!: any[];
  deliveries!: any[]
  latitude!: number;
  longitude!: number;
  selectedCity!: string;
  validationErrors: string[] | undefined;
  // model: User = {
  //   email: '',
  //   password: '',
  //   name: '',
  //   country_id: '',
  //   city_id: '',
  //   store_delivery_id: '',
  //   address: '',
  //   phone: '',
  //   website_url: '',
  //   company_name: '',
  //   slogan: '',
  //   longitude: 0,
  //   latitude: 0
  // };
  constructor(private http: HttpClient,private toastr: ToastrService,private fb: FormBuilder,
    private router: Router,private accountService: AccountService) {
    // getting country list
    this.http.get<any>('https://test.zmallapp.com/api/admin/get_country_list').subscribe(
      response => {
        if (response.success) {
          this.countries = response.countries;
        }
      },
      error => {
        console.log(error);
      }
    );


  }



  ngOnInit(): void {
    this.initializeForm();
    this.accountService.getCountryList().subscribe((response: any) => {
      console.log(response);
      // Handle the country list response here
      if (response.success) {
        this.countries = response.countries;
        // Do something with the country list, e.g. populate a dropdown
      }
    });
    // Getting current location longitude and latitude
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.latitude," =="+this.longitude)
      });
    }
  }



  // Form Initalization
  initializeForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country_id: [null, Validators.required],
      city_id: [null, Validators.required],
      store_delivery_id: [null, Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      company_name: ['', Validators.required],
      // website_url: ['', Validators.required],
      // slogan: ['', Validators.required]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  register() {

    //const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value, latitude: this.latitude,longitude:this.longitude};
    this.accountService.register(values).subscribe((result) => {
      debugger;
        //this.router.navigateByUrl('/home')
      console.log(values);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  register2() {

    const code = "251";
    const values = {...this.registerForm.value, latitude: this.latitude,longitude:this.longitude,country_phone_code:code};
    this.accountService.register(values).subscribe(
      (response) => {

        
        console.log('Order Rejected', response);

      });
  }
  // For matching Password Field
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }


  onCountrySelected(countryId: string) {
    this.accountService.getCityList(countryId).subscribe((response: any) => {
      console.log(response);
      // Handle the city list response here
      if (response.success) {
        this.cities = response.cities;
        console.log(this.cities)
        // Do something with the city list, e.g. populate a dropdown
      }
    });
  }

  // On City Selected
  onCitySelected(city_id: string) {
    this.accountService.get_delivery_list_for_city(city_id).subscribe((response: any) => {
      console.log(response);
      // Handle the delivery_list  response here
      if (response.success) {
        this.deliveries = response.deliveries;
        console.log(this.deliveries)
        // Do something with the delivery_list , e.g. populate a dropdown
      }
    });
  }
}
