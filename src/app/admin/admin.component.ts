import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery"

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  hideSideBar:boolean=true;
  checkMoreOpen:string="close"

  constructor(private route:Router, private http:HttpClient) { 
    if(sessionStorage.getItem("Admin")!="AdminisTrue"){
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
}
