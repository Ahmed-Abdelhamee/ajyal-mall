import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-store-location-dash',
  templateUrl: './store-location-dash.component.html',
  // adding a css file to a component => Keep in mind that the URL should be relative to the component folder.
  styleUrls: ['./store-location-dash.component.scss',"../z-admin-style/admin-style.css"]
})
export class StoreLocationDashComponent implements OnInit {

  // data variables
  datalist: any[] = [];
  CarasoulstoreLocationURL: string = "";
  // for controlling the view and data
  Basic_part_of_control: string = "";
  action_Will_Be_Done: string = "";
  type_of_data_in_part: string = "";
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
  

  constructor(private route:Router,private fb:FormBuilder ,private auth:AdminAuthService , private dataServ:DataService , private http:HttpClient, private firestorage:AngularFireStorage) { 
    if(sessionStorage.getItem("Admin")!=auth.AdminUserID){
      route.navigate(["/admin/dash-login"])
    }
  }

  ngOnInit(): void {
    this.openPart('table data','carsouel','');
  }
 //--------------------------------------- open the view for data special control ---------------------------------------
 openPart(part:string,type:string,action:string){
    this.Basic_part_of_control=part;
    this.action_Will_Be_Done=action;
    this.type_of_data_in_part=type;
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
    if( this.action_Will_Be_Done =="add"){
        this.dataServ.create(this.homeImg.value,"storeLocation","add");
      }
      else if(this.type_of_data_in_part=="carsouel" && this.action_Will_Be_Done =="edit"){
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
  update(item:any,action_Will_Be_Done:string){
    this.updateObject=item;
    this.action_Will_Be_Done=action_Will_Be_Done
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
  deleteItem(item:any,action_Will_Be_Done:string){
      if(this.type_of_data_in_part=='carsouel' && action_Will_Be_Done=='delete')
      {
        this.action_Will_Be_Done=action_Will_Be_Done;
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
      const path=`ajyal/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulstoreLocationURL=url;
    }
    this.uploading="uploadedstoreLocationCarasoul";
  }
  
}
