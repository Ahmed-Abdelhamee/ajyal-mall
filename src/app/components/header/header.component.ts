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
  checkNavlinksOpen:string="close"
  checkMoreOpen:string="close"
  
  constructor() { }

  ngOnInit(): void {
  }
  // because the use of old version of bootstrap so there may be an error on openning lists
  // we create these two function to replace the error of the openning view 
  removeStrechOnDropdownList(){
    if(this.checkMoreOpen=="open"){
      $(".dropdown-menu").removeClass("more-view-open")
      this.checkMoreOpen="close";
    }
    if(this.checkNavlinksOpen=="close"){
      $(".navbar-collapse").removeClass("navbar-view-close")
      $(".navbar-collapse").addClass("navbar-view-open")
      this.checkNavlinksOpen="open"
    }else{
      $(".navbar-collapse").removeClass("navbar-view-open")
      $(".navbar-collapse").addClass("navbar-view-close")
      this.checkNavlinksOpen="close"
    }
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
