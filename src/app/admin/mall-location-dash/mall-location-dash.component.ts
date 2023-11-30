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
  carsouelFormControl:string="";
  partViewController:string="";
  sectionViewController:string="";
  edit_control:string="";
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
      this.parttext=`the show of ${type}`
      this.partViewController=part;
      this.sectionViewController=action;
      this.carsouelFormControl=action;
      this.edit_control=type;
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
      this.edit_control=type;
      if(type=="mall-location-carsouel"){
        this.dataServ.getMallLocationCarsoul().subscribe(data=>{
          for (const key in data) {
            this.datalist.push(data[key])
          }
        })
      }
    }
  

// ------------------------------------- send data to add to database -----------------------------------
  
  // ------------- Carasoul function for MallLocation -----------------
  sendCarasoul(edit_control:string,sectionViewController:string){
    this.MallLocation.patchValue({
      img:this.CarasoulURL,
    })
    // add carasoul
    if(edit_control=="mall-location-carsouel" && sectionViewController =="add")
    {
      this.dataServ.create(this.MallLocation.value,"MallLocationCarasoul","add");
    }
    // edit carasoul
    else if(edit_control=="mall-location-carsouel" && sectionViewController =="edit"){
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

  // --------------------------------------- update part ---------------------------------------
  update(item:any,sectionViewController:string){
    this.updateObject=item;
    if(this.edit_control=='mall-location-carsouel' && sectionViewController=='edit')
      {
        this.sectionViewController=sectionViewController
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
  deleteItem(item:any,sectionViewController:string){
    //----------- delete carasoul -----------
    if(this.edit_control=='mall-location-carsouel' && sectionViewController=='delete')
    {
      this.sectionViewController=sectionViewController;
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
  async uploadCarasoul(event:any,edit_control:string){
    this.edit_control=edit_control
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
