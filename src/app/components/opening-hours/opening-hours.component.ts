import { Component, OnInit } from '@angular/core';
import { homePhoto } from 'src/app/interfaces/home.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.scss']
})
export class OpeningHoursComponent implements OnInit {

  carasoulImages:homePhoto[]=[]
  Content:homePhoto[]=[]

  constructor(private dataServ:DataService) { 
    if(sessionStorage.getItem("runCarsouel")!="openingOursReloaded"){
      sessionStorage.setItem("runCarsouel","openingOursReloaded")
      location.reload();
    }
    // -------   get the data -------
    this.dataServ.getOpenningCarsoul().subscribe(data =>{
      for (const key in data) {
        this.carasoulImages.push(data[key])
      }
    })
    this.dataServ.getOpenningImages().subscribe(data =>{
      for (const key in data) {
        this.Content.push(data[key])
      }
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
