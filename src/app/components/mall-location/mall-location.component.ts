import { Component, OnInit } from '@angular/core';
import { homePhoto } from 'src/app/interfaces/home.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mall-location',
  templateUrl: './mall-location.component.html',
  styleUrls: ['./mall-location.component.scss', '../z-shared-styles/home-shared-style.scss']
})
export class MallLocationComponent implements OnInit {

  carasoulImages:homePhoto[]=[];

  constructor(private dataServ:DataService) {
    if(sessionStorage.getItem("runCarsouel")!="hereReloaded"){
      sessionStorage.setItem("runCarsouel","hereReloaded")
      location.reload();
    }
   }

  ngOnInit(): void {
    // -------   get the data -------
    this.dataServ.getMallLocationCarsoul().subscribe(data =>{
      for (const key in data) {
        this.carasoulImages.push(data[key])
      }
    })
  }
}
