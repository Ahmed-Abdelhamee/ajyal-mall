import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  AdminUserID:any="admin";
  loginAdminError:boolean=false;

  constructor(private auth:Auth ,private route:Router) { }

  // register(Admin:any){
  //   createUserWithEmailAndPassword(this.auth,Admin.email,Admin.pass).then((user)=>{
  //     this.AdminUser=user;
  //     this.AdminUserID=user.user.uid;
  //   })
  // }

  login(Admin:any){
    let x=signInWithEmailAndPassword(this.auth,Admin.email,Admin.pass).then((user)=>{
      // this.AdminUserID = user.user.refreshToken;
      this.AdminUserID = user.user.uid;
      this.loginAdminError=false;
      sessionStorage.setItem("Admin",this.AdminUserID);
      this.route.navigate(["/admin/home"])
    }).catch(()=>{
        sessionStorage.setItem("Admin","isFalse")
        this.loginAdminError=true;
      })
  }
}
