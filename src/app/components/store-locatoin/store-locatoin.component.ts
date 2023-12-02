import { Component, OnInit } from '@angular/core';
import { homePhoto } from 'src/app/interfaces/home.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-store-locatoin',
  templateUrl: './store-locatoin.component.html',
  styleUrls: ['./store-locatoin.component.scss', '../z-shared-styles/home-shared-style.scss']
})
export class StoreLocatoinComponent implements OnInit {

  list:homePhoto[]=[]

  constructor(private dataServ:DataService) {
    if(sessionStorage.getItem("runCarsouel")!="storeReloaded"){
      sessionStorage.setItem("runCarsouel","storeReloaded")
      location.reload();
    }
    // -------   get the data -------
    this.dataServ.getstoreLocation().subscribe(data =>{
      for (const key in data) {
        this.list.push(data[key])
      }
    })
   }

  ngOnInit(): void {
  }
}
