import { Component, OnInit } from '@angular/core';
import { homePhoto } from 'src/app/interfaces/home.interface';
import { DataService } from 'src/app/services/data.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-ajyal-mall',
  templateUrl: './ajyal-mall.component.html',
  styleUrls: ['./ajyal-mall.component.scss', '../z-shared-styles/home-shared-style.scss']
})
export class AjyalMallComponent implements OnInit {

  constructor(private dataServ:DataService) {
    if(sessionStorage.getItem("runCarsouel")!="accessoriesReloaded"){
      sessionStorage.setItem("runCarsouel","accessoriesReloaded")
      location.reload();
    }
   }

  imgSource:any;
  carasoulImages:homePhoto[]=[]
  images:any[]=[];
  seeMoreImgs:boolean=false;
  imageShow:any[]=[];

  ngOnInit(): void {
    this.dataServ.getaccessoriesCarasoul().subscribe(data =>{
      for (const key in data) {
        this.carasoulImages.push(data[key])
      }
    })
    this.dataServ.getaccessoriesImages().subscribe(data =>{
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
