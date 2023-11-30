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
  
  constructor() { }

  ngOnInit(): void {
  }

}
