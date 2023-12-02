import { Component, OnInit } from '@angular/core';
import { homePhoto } from 'src/app/interfaces/home.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cafes',
  templateUrl: './cafes.component.html',
  styleUrls: ['./cafes.component.scss']
})
export class CafesComponent implements OnInit {

  constructor(private dataServ:DataService) {
    if(sessionStorage.getItem("runCarsouel")!="cafesReloaded"){
      sessionStorage.setItem("runCarsouel","cafesReloaded")
      location.reload();
    }
   }

  imgSource:any;
  carasoulImages:homePhoto[]=[]
  images:any[]=[];
  seeMoreImgs:boolean=false;
  imageShow:any[]=[];

  ngOnInit(): void {
    this.dataServ.getCafesCarsoul().subscribe(data =>{
      for (const key in data) {
        this.carasoulImages.push(data[key])
      }
    })
    this.dataServ.getCafesImages().subscribe(data =>{
      for (const key in data) {
        this.images.push(data[key])
      }
      // this.images.reverse()
    })
    
    $(function () {
      hide() 
      function hide() {
        $(".showImg").hide();
      }
      $("#close").on("click", hide);
    });
  }

  showProduct(src:homePhoto){
    this.imageShow=[]
    $(function () {
      $(".showImg").show();
    })
    setTimeout(()=> this.imageShow=this.images,50)
    this.imgSource=this.images.indexOf(src);
  }

}
