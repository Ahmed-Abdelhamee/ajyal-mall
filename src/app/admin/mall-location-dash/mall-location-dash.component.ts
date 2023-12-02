import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mall-location-dash',
  templateUrl: './mall-location-dash.component.html',
  // adding a css file to a component => Keep in mind that the URL should be relative to the component folder.
  styleUrls: ['./mall-location-dash.component.scss',"../z-admin-style/admin-style.css"]
})
export class MallLocationDashComponent implements OnInit {

  // data variables
  parttext:string="";
  CarasoulURL:string="";
  datalist:any[]=[];
  databaseURL:any="";
  // variables for controll the view
  Basic_part_of_control:string="";
  type_of_data_in_part:string="";
  action_Will_Be_Done:string="";
  viewController:string="";
  uploadingImg:string="null";
  uploadingCarasoul:string="null";
  // for check update
  updateObject:any;
  // for check delete
  deletedObject: any;
  // for popup deleted item show
  showDeleteDiv:boolean=false;
  // for adding 
  MallLocation=this.fb.group({
    img:[""],
    id:[new Date().getTime()]
  })
  MallLocationMap=this.fb.group({
    map:[""],
    id:[new Date().getTime()]
  })

  constructor(private route:Router,private fb:FormBuilder , private dataServ:DataService , private http:HttpClient, private firestorage:AngularFireStorage) { 
    if(sessionStorage.getItem("Admin")!="AdminisTrue"){
      route.navigate(["/admin/dash-login"])
    }
  }

  ngOnInit(): void {
    this.openPart('table data','mall-location-carsouel','')
  }

    // ------------------------------------- open part ------------------------------------------
    openPart(part:string,type:string,action:string){
      // part  is a basic part of view   assigned to  -------- Basic_part_of_control
      // type is a type of data view control   assigned to  --------   type_of_data_in_part
      // action is a order of view control for adding or delete or edit   assigned to ----------  action_Will_Be_Done

      this.parttext=`the show of ${type}`
      this.Basic_part_of_control=part;
      this.type_of_data_in_part=type;
      this.action_Will_Be_Done=action;
      // delete texts and old data
      this.uploadingCarasoul=""
      this.uploadingImg=""
      this.showDeleteDiv=false
      if(part=="table data"){
        this.showdata(type);
      }
    }
  
    // ------------------------------------ show data table -------------------------------------
    showdata(type:string){
      this.datalist=[]
      this.type_of_data_in_part=type;
      if(type=="mall-location-carsouel"){
        this.dataServ.getMallLocationCarsoul().subscribe(data=>{
          for (const key in data) {
            this.datalist.push(data[key])
          }
        })
      }else if(type=="mall-location-map"){
        this.dataServ.getMallLocationMap().subscribe(data=>{
          for (const key in data) {
            this.datalist.push(data[key])
          }
        })
      }
    }
  

// ------------------------------------- send data to add to database -----------------------------------
  
  // ------------- Carasoul function for MallLocation -----------------
  sendCarasoul(type_of_data_in_part:string,action_Will_Be_Done:string){
    this.MallLocation.patchValue({
      img:this.CarasoulURL,
    })
    // add carasoul
    if(type_of_data_in_part=="mall-location-carsouel" && action_Will_Be_Done =="add")
    {
      this.dataServ.create(this.MallLocation.value,"MallLocationCarasoul","add");
    }
    // edit carasoul
    else if(type_of_data_in_part=="mall-location-carsouel" && action_Will_Be_Done =="edit"){
      this.dataServ.getMallLocationCarsoul().subscribe(data=>{
        for (const key in data) {
          if(this.updateObject.id==data[key].id){
            this.MallLocation.patchValue({
              id:Number(this.updateObject.id)
            })
            this.dataServ.create(this.MallLocation.value,"MallLocationCarasoul",key);
            break;
          }
        }
      })
    }
    this.uploadingCarasoul="null";
  }

  sendMap(type_of_data_in_part:string,action_Will_Be_Done:string){
    if(type_of_data_in_part=="mall-location-map" && action_Will_Be_Done =="update"){
      this.dataServ.getMallLocationMap().subscribe(data=>{
        console.log("data")
        for (const key in data) {
            this.dataServ.create(this.MallLocationMap.value,"MallLocationMap",key);
            break;
          }
      })
    }
  }

  // --------------------------------------- update part ---------------------------------------
  update(item:any,action_Will_Be_Done:string){
    this.updateObject=item;
    if(this.type_of_data_in_part=='mall-location-carsouel' && action_Will_Be_Done=='edit')
      {
        this.action_Will_Be_Done=action_Will_Be_Done
      } 
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
  deleteItem(item:any,action_Will_Be_Done:string){
    //----------- delete carasoul -----------
    if(this.type_of_data_in_part=='mall-location-carsouel' && action_Will_Be_Done=='delete')
    {
      this.action_Will_Be_Done=action_Will_Be_Done;
      this.dataServ.getMallLocationCarsoul().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("MallLocationCarasoul",key);
            break;
          }
        }
      })
    }
  }


  // --------------------------------------------  upload photos -----------------------------------------

  // funcion to upload img file and get image url   ---- for MallLocation carasoul -------
  async uploadCarasoul(event:any,type_of_data_in_part:string){
    this.type_of_data_in_part=type_of_data_in_part
    this.uploadingCarasoul="uploadingCarasoul";
    const file=event.target.files[0];
    if(file){
      const path=`ajyal/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulURL=url;
    }
    this.uploadingCarasoul="CarasoulUploaded";
  }

}
