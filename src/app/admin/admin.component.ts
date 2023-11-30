import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  hideSideBar:boolean=true;

  constructor(private route:Router, private http:HttpClient) { 
    if(sessionStorage.getItem("Admin")!="AdminisTrue"){
      this.route.navigate(["/not-found"])
      this.hideSideBar=false;
    }
  }

  ngOnInit(): void {
  }

}
