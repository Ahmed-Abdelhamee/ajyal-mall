import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  MoreListMenuClick:string = "frist-click";
  navbarTogglerButtonClick:string = "frist-click";
  display:boolean=true;
  checkMoreOpen:string="close"
  
  constructor() { }

  ngOnInit(): void {
  }

  openMore(){
    if(this.checkMoreOpen=="close"){
      $(".dropdown-menu").addClass("more-view-open")
      this.checkMoreOpen="open"
    }else{
      $(".dropdown-menu").removeClass("more-view-open")
      this.checkMoreOpen="close"
    }
  }

}
