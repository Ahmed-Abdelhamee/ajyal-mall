import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { homePhoto } from 'src/app/interfaces/home.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-child-comp-view',
  templateUrl: './child-comp-view.component.html',
  styleUrls: ['./child-comp-view.component.scss',"../z-admin-style/admin-style.css"]
})
export class ChildCompViewComponent implements OnInit , OnChanges {

  datalist:any[]=[];
  parttext:string="";
  @Input() data:string="";

  // for update
  updateObject:homePhoto={
    img:"",
    id:""
  }
  // for check delete
  deletedObject: any;
  // for popup deleted item show
  showDeleteDiv:boolean=false;
  // for adding data 
  homeImg=this.fb.group({
    img:[""],
    id:[new Date().getTime()]
  })
  partViewController:string=""; // to view part vill be viewed   form   or   table
  edit_control:string="";  // to view which section in the part sellected will be shown
  sectionViewController:string=""; // to control which part will be edited by  adding  ,  deleting   , updating

  constructor(private route:Router,private fb:FormBuilder , private dataServ:DataService , private http:HttpClient, private firestorage:AngularFireStorage) { }
  
  ngOnChanges(): void {
    this.parttext=`the show of ${this.data}`
    this.datalist=[];
    this.datalist=[];
      this.dataServ.getData(this.data).subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
    })
  }

  ngOnInit(): void {
    
  }

  // --------------------------------------- delete part ---------------------------------------
DeleteSure(item:any){
  this.deletedObject=item;
  this.showDeleteDiv=true;
}
deleteDone(){
  this.deleteItem(this.deletedObject,"delete");
  this.showDeleteDiv=false;
}
cancel_delete(){
  this.showDeleteDiv=false;
}
deleteItem(item:any,sectionViewController:string){
//----------- delete carasoul -----------
  if(this.edit_control=='carsouel' && sectionViewController=='delete')
  {
    this.sectionViewController=sectionViewController;
    this.dataServ.getCarsoul().subscribe(data=>{
      for (const key in data) {
        if(item.id==data[key].id){
          this.dataServ.delete("carsouel",key);
          break;
        }
      }
    })
//------------- delete content -------------
  } else if(this.edit_control=='products' && sectionViewController=='delete') {
    this.sectionViewController=sectionViewController;
    this.dataServ.gethomeImages().subscribe(data=>{
      for (const key in data) {
        if(item.id==data[key].id){
          console.log(item.id)
          this.dataServ.delete("products",key);
          break;
        }
      }
    })
  }

}// --------------------------------------- update part ---------------------------------------
update(item:any,sectionViewController:string){
  this.updateObject=item;
  if(this.edit_control=='carsouel' && sectionViewController=='edit')
    {
      this.sectionViewController=sectionViewController
    } else if(this.edit_control=='products' && sectionViewController=='edit')
    {
      this.sectionViewController=sectionViewController
    }
}

// ------------------------------------- open part ------------------------------------------
    openPart(part:string,type:string,action:string){
      this.parttext=`the show of ${type}`
      this.partViewController=part;
      this.sectionViewController=action;
      this.edit_control=type;
      // delete texts and old data
      this.showDeleteDiv=false
    }

}
