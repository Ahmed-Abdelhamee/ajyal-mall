import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGardGuard implements CanActivate {

  constructor(private auth:AdminAuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem("Admin") != "you is admin"){
        this.router.navigate(["/**"])
      }
    return sessionStorage.getItem("Admin") == "you is admin" ? true:false;
  }
  
}
