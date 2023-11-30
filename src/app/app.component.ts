import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ajyal-mall';
  
  websitePages=["","home","clothing" ,"shoes" ,"accessories" ,"perfumes","dining","cafes" ,'entertainment',"about","opening-hours","mall-location","store-location","contact-us","abairaq-tower" ,"albiraq-0-admin-0-mall"]

  showHeader:boolean=true;
  constructor(private route:Router){
    route.events.subscribe( val =>{
      if( val instanceof NavigationEnd){
        if(val.url.split("/").includes('admin') || val.url.endsWith("albiraq-0-admin-0-mall") || !this.websitePages.includes(val.url.split("/").pop()!)){
          this.showHeader=false;
        }else{
          this.showHeader=true;
        }
      }
    })
  }
}
