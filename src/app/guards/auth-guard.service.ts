// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  // public isLoggedIn = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  // setIsLoggedIn(value: boolean) {
  //   this.isLoggedInSubject.next(value);
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     // const token = localStorage.getItem('token');
      const token = localStorage.getItem('user');

      if (token) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
