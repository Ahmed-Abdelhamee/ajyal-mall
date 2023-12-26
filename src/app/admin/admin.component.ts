import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery"
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  hideSideBar:boolean=true;
  checkMoreOpen:string="close"

  constructor(private route:Router, private http:HttpClient, private auth:AdminAuthService) { 
    if(sessionStorage.getItem("Admin")!="you is admin"){
      this.route.navigate(["/not-found"])
      this.hideSideBar=false;
    }
  }

  ngOnInit(): void {

  }

  openMore(){
    if(this.checkMoreOpen=="close"){
      $(".dropdown-menu-dark").addClass("more-view-open")
      this.checkMoreOpen="open"
    }else{
      $(".dropdown-menu-dark").removeClass("more-view-open")
      this.checkMoreOpen="close"
    }
  }

  logout(){
    sessionStorage.removeItem("Admin");
    this.route.navigate(["/"])
  }
}
