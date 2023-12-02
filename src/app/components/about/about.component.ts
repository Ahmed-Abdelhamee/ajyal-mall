import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/interfaces/About.interface';
import { homePhoto } from 'src/app/interfaces/home.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', '../z-shared-styles/home-shared-style.scss']
})
export class AboutComponent implements OnInit {

  carasoulImages:homePhoto[]=[]
  Content:About[]=[]
  
  constructor(private dataServ:DataService) { 
    if(sessionStorage.getItem("runCarsouel")!="aboutReloaded"){
      sessionStorage.setItem("runCarsouel","aboutReloaded")
      location.reload();
    }
    // -------   get the data -------
    this.dataServ.getAboutCarsoul().subscribe(data =>{
      for (const key in data) {
        this.carasoulImages.push(data[key])
      }
    })
    this.dataServ.getAboutContent().subscribe(data =>{
      for (const key in data) {
        this.Content.push(data[key])
      }
    })
  }
  ngOnInit(): void {
  }

}
