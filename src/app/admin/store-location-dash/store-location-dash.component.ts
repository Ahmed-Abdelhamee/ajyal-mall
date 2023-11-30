import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-store-location-dash',
  templateUrl: './store-location-dash.component.html',
  styleUrls: ['./store-location-dash.component.scss']
})
export class StoreLocationDashComponent implements OnInit {

  // data variables
  datalist: any[] = [];
  CarasoulstoreLocationURL: string = "";
  // for controlling the view and data
  carsouelFormControl: string = "";
  partViewController: string = "";
  sectionViewController: string = "";
  edit_control: string = "";
  uploading: string = "";
  // for check delete
  deletedObject: any;
  // for popup deleted item show
  showDeleteDiv:boolean=false;
  // for updating data
  updateObject: any;
  // for adding data
  homeImg=this.fb.group({
    img:[""],
    id:[new Date().getTime()]
  })
  

  constructor(private route:Router,private fb:FormBuilder , private dataServ:DataService , private http:HttpClient, private firestorage:AngularFireStorage) { 
  }

  ngOnInit(): void {
    this.openPart('table data','carsouel','');
  }
 //--------------------------------------- open the view for data special control ---------------------------------------
 openPart(part:string,type:string,action:string){
    this.partViewController=part;
    this.sectionViewController=action;
    this.edit_control=type;
    this.carsouelFormControl=action;
    if(part=="table data"){
      this.showdata(type);
    }
    this.showDeleteDiv=false
  }
  //--------------------------------------- for view the data in table---------------------------------------
  showdata(type:string){
    this.datalist=[]
    if(type=="carsouel"){
      this.dataServ.getstoreLocation().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }
  }
  // --------------------------------------- Carasoul function for storeLocation ---------------------------------------
  sendCarasoulstoreLocation(){
    this.homeImg.patchValue({
      img:this.CarasoulstoreLocationURL
    })
    if( this.sectionViewController =="add"){
        this.dataServ.create(this.homeImg.value,"storeLocation","add");
      }
      else if(this.edit_control=="carsouel" && this.sectionViewController =="edit"){
            this.dataServ.getstoreLocation().subscribe(data=>{
              for (const key in data) {
                if(this.updateObject.id==data[key].id){
                  this.homeImg.patchValue({
                    id:Number(this.updateObject.id)
              })
              this.dataServ.create(this.homeImg.value,"storeLocation",key);
              break;
            }
          }
        })
      }
    this.uploading="null";
  }
  // --------------------------------------- update part ----------------------------------------------------
  update(item:any,sectionViewController:string){
    this.updateObject=item;
    this.sectionViewController=sectionViewController
  }
  // --------------------------------------- delete part ----------------------------------------------------
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
      if(this.edit_control=='carsouel' && sectionViewController=='delete')
      {
        this.sectionViewController=sectionViewController;
        this.dataServ.getstoreLocation().subscribe(data=>{
          for (const key in data) {
            if(item.id==data[key].id){
              this.dataServ.delete("storeLocation",key);
              break;
            }
          }
        })
      } 
  }

  // ------------------- funcion to upload img file and get image url ---- for storeLocation Product -------------
  async uploadstoreLocationCarasoul(event:any){
    this.uploading="uploadingstoreLocationCarasoul";
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulstoreLocationURL=url;
    }
    this.uploading="uploadedstoreLocationCarasoul";
  }
  
}
